import React from 'react';
import { NoRenovacionArriendoData } from '../../types/documents';
import { DocumentForm as ModularNoRenovacionArriendoForm } from '../../templates/inmobiliario/no_renovacion_arriendo';

interface Props {
  data: NoRenovacionArriendoData;
  onChange: (updated: NoRenovacionArriendoData) => void;
}

export const NoRenovacionArriendoForm: React.FC<Props> = (props) => {
  return <ModularNoRenovacionArriendoForm {...props} />;
};
