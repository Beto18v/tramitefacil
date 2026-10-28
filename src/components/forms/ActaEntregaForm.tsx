import React from 'react';
import { ActaEntregaData } from '../../types/documents';
import { DocumentForm as ModularActaEntregaForm } from '../../templates/inmobiliario/acta_entrega';

interface Props {
  data: ActaEntregaData;
  onChange: (updated: ActaEntregaData) => void;
}

export const ActaEntregaForm: React.FC<Props> = (props) => {
  return <ModularActaEntregaForm {...props} />;
};
