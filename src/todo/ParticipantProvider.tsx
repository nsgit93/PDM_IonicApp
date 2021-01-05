import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../core';
import { ParticipantProps } from './ParticipantProps';
import { createParticipant, getParticipants, newWebSocket, updateParticipant, deleteParticipantA } from './ParticipantApi';
import { AuthContext } from '../auth';

import { Plugins } from '@capacitor/core';

const {Storage} = Plugins;

const log = getLogger('ParticipantProvider');

type SaveParticipantFn = (Participant: ParticipantProps) => Promise<any>;
type DeleteParticipantFn = (Participant: ParticipantProps) => Promise<any>;

export interface ParticipantsState {
  Participants?: ParticipantProps[],
  fetching: boolean,
  fetchingError?: Error | null,
  saving: boolean,
  savingError?: Error | null,
  saveParticipant?: SaveParticipantFn,
  deleting: boolean,
  deletingError?: Error | null,
  deleteParticipant?: DeleteParticipantFn,
}

interface ActionProps {
  type: string,
  payload?: any,
}

const initialState: ParticipantsState = {
  fetching: false,
  saving: false,
  deleting: false,
};

const FETCH_PARTICIPANTS_STARTED = 'FETCH_PARTICIPANTS_STARTED';
const FETCH_PARTICIPANTS_SUCCEEDED = 'FETCH_PARTICIPANTS_SUCCEEDED';
const FETCH_PARTICIPANTS_FAILED = 'FETCH_PARTICIPANTS_FAILED';
const SAVE_PARTICIPANT_STARTED = 'SAVE_PARTICIPANT_STARTED';
const SAVE_PARTICIPANT_SUCCEEDED = 'SAVE_PARTICIPANT_SUCCEEDED';
const SAVE_PARTICIPANT_FAILED = 'SAVE_PARTICIPANT_FAILED';
const DELETE_PARTICIPANT_STARTED = 'DELETE_PARTICIPANT_STARTED'
const DELETE_PARTICIPANT_SUCCEDED = 'DELETE_PARTICIPANT_SUCCEDED'
const DELETE_PARTICIPANT_FAILED = 'DELETE_PARTICIPANT_FAILED'

const reducer: (state: ParticipantsState, action: ActionProps) => ParticipantsState =
  (state, { type, payload }) => {
    switch (type) {
      case FETCH_PARTICIPANTS_STARTED:
        return { ...state, fetching: true, fetchingError: null };
      case FETCH_PARTICIPANTS_SUCCEEDED:
        return { ...state, Participants: payload.Participants, fetching: false };
      case FETCH_PARTICIPANTS_FAILED:
        return { ...state, fetchingError: payload.error, fetching: false };
      case SAVE_PARTICIPANT_STARTED:
        return { ...state, savingError: null, saving: true };
      case DELETE_PARTICIPANT_STARTED:
        return {...state, deletingError: null, deleting: true};
      case SAVE_PARTICIPANT_SUCCEEDED:
        console.log("save participant succeeded");
        const Participants = [...(state.Participants || [])];
        const Participant = payload.Participant;
        const index = Participants.findIndex(it => it._id === Participant._id);
        if (index === -1) {
          Participants.splice(0, 0, Participant);
        } else {
          Participants[index] = Participant;
        }
        return { ...state, Participants, saving: false };
      case DELETE_PARTICIPANT_SUCCEDED:
        const for_delete = payload.Participant
        const Participants2 = [...(state.Participants || [])];
        let index3 = Participants2?.findIndex(c=>c._id == for_delete._id)
        if (index3 == 0){
          Participants2.shift()
        } else if (index3 > 0) {
          Participants2?.splice(index3, 1);
        }
        console.log(state)
          console.log(Participants2)
        return {...state, Participants: Participants2, deleting: false}
      case SAVE_PARTICIPANT_FAILED:
        return { ...state, savingError: payload.error, saving: false };
      case DELETE_PARTICIPANT_FAILED:
        return {...state, deletingError: payload.error, deleting: false}
      default:
        return state;
    }
  };

export const ParticipantContext = React.createContext<ParticipantsState>(initialState);

interface ParticipantProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const ParticipantProvider: React.FC<ParticipantProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { Participants, fetching, fetchingError, saving, savingError, deleting, deletingError } = state;
  useEffect(getParticipantsEffect, [token]);
  useEffect(wsEffect, [token]);
  const saveParticipant = useCallback<SaveParticipantFn>(saveParticipantCallback, [token]);
  const deleteParticipant = useCallback<DeleteParticipantFn>(deleteParticipantCallback, [token]);
  const value = { Participants, fetching, fetchingError, saving, savingError, saveParticipant, deleting, deletingError, deleteParticipant };
  

  
  log('returns');
  return (
    <ParticipantContext.Provider value={value}>
      {children}
    </ParticipantContext.Provider>
  );

  function getParticipantsEffect() {
    let canceled = false;
    fetchParticipants();
    return () => {
      canceled = true;
    }



    async function fetchParticipants() {
      if (!token?.trim()) {
        return;
      }
      try {
        log('fetchParticipants started');
        dispatch({ type: FETCH_PARTICIPANTS_STARTED });
        const Participants = await getParticipants(token);
        log('fetchParticipants succeeded');
        Storage.clear();
        Participants.forEach(part=>{
          Storage.set({
            key: part._id!,
            value: JSON.stringify({
              id: part._id, name: part.name, age: part.age, participationsNo: part.participationsNo
            })
          });
        })
        if (!canceled) {
          dispatch({ type: FETCH_PARTICIPANTS_SUCCEEDED, payload: { Participants } });
        }
      } catch (error) {
        log('fetchParticipants failed');
        log("Error:");
        log(error);
        dispatch({ type: FETCH_PARTICIPANTS_FAILED, payload: { error } });
      }
    }
  }

  async function deleteParticipantCallback(Participant: ParticipantProps) {
    try {
      console.log('in delete')
      console.log(token)
      dispatch({ type: DELETE_PARTICIPANT_STARTED });
      const deleted = await (deleteParticipantA(token, Participant));
      log('deleteParticipant succeeded:');
      log(deleted);
      dispatch({ type: DELETE_PARTICIPANT_SUCCEDED, payload: { Participant: Participant } });
    } catch (error) {
      log('saveParticipant failed');
      dispatch({ type: DELETE_PARTICIPANT_FAILED, payload: { error } });
    }
  }

  async function saveParticipantCallback(Participant: ParticipantProps) {
    try {
      console.log('in save')
      console.log(token)
      // log('saveParticipant started');
      dispatch({ type: SAVE_PARTICIPANT_STARTED });
      const savedParticipant = await (Participant._id ? updateParticipant(token, Participant) : createParticipant(token, Participant));
      log("Saved participant:");
      log(savedParticipant);
      // log('saveParticipant succeeded');
      Storage.set({
        key: Participant._id!,
        value: JSON.stringify({
          id: savedParticipant._id, name: Participant.name, age: Participant.age, participationsNo: Participant.participationsNo
        })
      });
      
      dispatch({ type: SAVE_PARTICIPANT_SUCCEEDED, payload: { Participant: savedParticipant } });
    } catch (error) {
      log('saveParticipant failed');
      log("Error:");
      log(error);
      dispatch({ type: SAVE_PARTICIPANT_FAILED, payload: { error } });
    }
  }

  function wsEffect() {
    let canceled = false;
    log('wsEffect - connecting');
    let closeWebSocket: () => void;
    if (token?.trim()) {
      closeWebSocket = newWebSocket(token, message => {
        console.log('am primit')
        console.log(message.payload)
        if (canceled) {
          return;
        }
        const { type, payload: Participant } = message;
        log(`ws message, Participant ${type}`);
        if (type === 'created' || type === 'updated') {
          dispatch({ type: SAVE_PARTICIPANT_SUCCEEDED, payload: { Participant } });
        } else if (type === 'deleted') {
          dispatch({ type: DELETE_PARTICIPANT_SUCCEDED, payload: { Participant: Participant } });
        }
      });
    }
    return () => {
      log('wsEffect - disconnecting');
      canceled = true;
      closeWebSocket?.();
    }
  }
};
