import React, { useContext, useState, useEffect } from 'react';

import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter
} from '@ionic/react';
import {add, trash} from 'ionicons/icons';
import Participant from './Participant';
import { getLogger } from '../core';
import { ParticipantContext } from './ParticipantProvider';
import { useAppState } from './useAppState';
import { useNetwork } from './useNetwork';
import {getParticipants, getParticipantsAge} from './ParticipantApi'
import { AuthContext } from '../auth';

const log = getLogger('ParticipantList');

const ParticipantList: React.FC<RouteComponentProps> = ({ history }) => {
  const { Participants, fetching, fetchingError, deleteParticipant } = useContext(ParticipantContext);
  const delete_participant = (id?: string) => {
    let participant = Participants?.find(t => t._id == id)
    if (participant)
      if (deleteParticipant) {
        deleteParticipant(participant).then(r => {
        })
      }
  }
  const { token } = useContext(AuthContext);
  const { appState } = useAppState();
  const { networkStatus } = useNetwork();

  const [searchParticipant, setSearchParticipant] = useState<string>('');
  const [filter, setFilter] = useState<string | undefined>(undefined);
  // const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);



  var ages = new Array();

  // var stop = 12;

  // function fetchData() {
  //   console.log("Total number of participants:")
  //   console.log(Participants?.length);
  //   console.log(Participants);
  //   console.log("Current number of shown participants:");
  //   console.log(stop);
  //   console.log("fetching 3 more participants")
  //   stop += 3;
  //   if(Participants)
  //     (Participants.length - stop > 3) ?  setDisableInfiniteScroll(false) : setDisableInfiniteScroll(true);
  // }
  
  // function searchNext($event: CustomEvent<void>) {
  //   console.log("search for more participants");
  //   fetchData();
  //   ($event.target as HTMLIonInfiniteScrollElement).complete();
  // }

  // useIonViewWillEnter(() => {
  //   fetchData();
  // })

  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Participanti - {appState.isActive ? "Online --- Network: " + networkStatus.connectionType.toString() : "Offline"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar
          value={searchParticipant}
          debounce={100}
          onIonChange={e => setSearchParticipant(e.detail.value!)}>
        </IonSearchbar>
        
        <IonLoading isOpen={fetching} message="Fetching Participants"/>
        {Participants && (
          <IonContent>
          <IonSelect value={filter} placeholder="Select Age" onIonChange={e => setFilter(e.detail.value)}>
          <IonSelectOption key={"None"} value={null}>
              All ages
            </IonSelectOption>
          {Participants
          .sort((a,b) => {
            return parseInt(a.age) - parseInt(b.age);
          })
          .map(participant => {
            if(!ages.includes(participant.age)){
              ages.push(participant.age);
              return <IonSelectOption key={participant.age} value={participant.age}>
              {participant.age} years old
            </IonSelectOption>
            }
          }
            
          )}
          </IonSelect>
          <IonList>
            {Participants
            // .slice(stop)
            .filter(participant => participant.name.indexOf(searchParticipant) >= 0)
            .filter(participant => filter ? participant.age == filter : participant)
            .sort((a,b) => {
              return a.name.localeCompare(b.name);
            })
            .map(({ _id, name,age,participationsNo}) =>
                <IonItemSliding key={_id}>
                  <IonItemOptions side="start">
                    <IonItemOption color="danger" onClick={() => delete_participant(_id)}><IonIcon slot="start" icon={trash}/></IonItemOption>
                  </IonItemOptions>
                  <IonItem>
                    <Participant key={_id} _id={_id} name={name} age={age} participationsNo={participationsNo} onEdit={id => history.push(`/participant/${id}`)} />
                  </IonItem>
                </IonItemSliding>
            )}
          </IonList>
          {/* <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                           onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingText="Loading more participants...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll> */}
          </IonContent>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch Participants'}</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/participant')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantList;
