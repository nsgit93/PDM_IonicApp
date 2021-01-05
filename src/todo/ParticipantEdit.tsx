import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar, 
  IonItem, 
  IonLabel,
  IonModal,
  IonGrid,
  IonCol,
  IonImg,
  IonFab,
  IonFabButton,
  IonRow,
  IonActionSheet,
  IonIcon
} from '@ionic/react';
import { getLogger } from '../core';
import { ParticipantContext } from './ParticipantProvider';
import { RouteComponentProps } from 'react-router';
import { ParticipantProps } from './ParticipantProps';
import {enterAnimation, leaveAnimation} from './Animations'

import { camera, close, trash } from 'ionicons/icons';
import { Photo, usePhotoGallery } from './usePhotoGallery';

const log = getLogger('ParticipantEdit');

interface ParticipantEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ParticipantEdit: React.FC<ParticipantEditProps> = ({ history, match }) => {
  const { Participants, saving, savingError, saveParticipant } = useContext(ParticipantContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [participationsNo, setParticipationsNo] = useState('');
  const [Participant, setParticipant] = useState<ParticipantProps>();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const Participant = Participants?.find(it => it._id === routeId);
    setParticipant(Participant);
    if (Participant) {
      setName(Participant.name);
      setAge(Participant.age)
      setParticipationsNo(Participant.participationsNo)
    }
  }, [match.params.id, Participants]);
  const handleSave = () => {
    const editedParticipant = Participant ? { ...Participant, name, age, participationsNo } : { name, age, participationsNo };
    saveParticipant && saveParticipant(editedParticipant).then(() => history.goBack());
  };
  log('render');
  return (
    <IonModal isOpen={true} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*<IonItem>*/}
        {/*  <IonLabel position="floating">Id</IonLabel>*/}
        {/*  <IonInput disabled value={Participant?._id}/>*/}
        {/*</IonItem>*/}
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)}
                        src={photo.webviewPath}/>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}/>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
        <IonItem>
          <IonLabel position="floating" >Name</IonLabel>
          <IonInput value={name} onIonChange={e => setName(e.detail.value || '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Age</IonLabel>
          <IonInput value={age} onIonChange={e => setAge(e.detail.value || '')}/>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">ParticipationsNo</IonLabel>
          <IonInput value={participationsNo} onIonChange={e => setParticipationsNo(e.detail.value || '')}/>
        </IonItem>
        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save Participant'}</div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ParticipantEdit;
