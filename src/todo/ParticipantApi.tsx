import axios from 'axios';
import { authConfig, baseUrl, getLogger, withLogs } from '../core';
import { ParticipantProps } from './ParticipantProps';

const ParticipantUrl = `http://${baseUrl}/api/participant`;

export const getParticipants: (token: string) => Promise<ParticipantProps[]> = token => {
  return withLogs(axios.get(ParticipantUrl, authConfig(token)), 'getParticipants');
}

export const getParticipantsAge: (token: string, age: String) => Promise<ParticipantProps[]> = (token, age) => {
  return withLogs(axios.get(ParticipantUrl+`/age`, {params:{token: authConfig(token), age: age}}), 'getParticipantsAge');
}

export const createParticipant: (token: string, Participant: ParticipantProps) => Promise<ParticipantProps> = (token, Participant) => {
  return withLogs(axios.post(ParticipantUrl, Participant, authConfig(token)), 'createParticipant');
}

export const updateParticipant: (token: string, Participant: ParticipantProps) => Promise<ParticipantProps> = (token, Participant) => {
  return withLogs(axios.put(`${ParticipantUrl}/${Participant._id}`, Participant, authConfig(token)), 'updateParticipant');
}

export const deleteParticipantA: (token: string, Participant: ParticipantProps) => Promise<ParticipantProps> = (token, Participant) => {
  return withLogs(axios.delete(`${ParticipantUrl}/${Participant._id}`, authConfig(token)), 'deleteParticipant');
}

interface MessageData {
  type: string;
  payload: ParticipantProps;
}

const log = getLogger('ws');

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
  const ws = new WebSocket(`ws://${baseUrl}`);
  ws.onopen = () => {
    log('web socket onopen');
    ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
  };
  ws.onclose = () => {
    log('web socket onclose');
  };
  ws.onerror = error => {
    log('web socket onerror', error);
  };
  ws.onmessage = messageEvent => {
    log('web socket onmessage');
    onMessage(JSON.parse(messageEvent.data));
  };
  return () => {
    ws.close();
  }
}
