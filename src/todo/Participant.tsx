import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { ParticipantProps } from './ParticipantProps';

interface ParticipantPropsExt extends ParticipantProps {
  onEdit: (_id?: String) => void;
}

const Participant: React.FC<ParticipantPropsExt> = ({ _id, name, age, participationsNo, onEdit }) => {
  return (
    <IonItem onClick={() => onEdit(_id)}>
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
};

export default Participant;
