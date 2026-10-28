import React from 'react';
import { AutorizacionPatiosData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularAutorizacionPatiosView } from '../../templates/vehiculos/autorizacion_patios';

interface Props {
  data: AutorizacionPatiosData;
  styleConfig: DocumentStyleConfig;
}

export const AutorizacionPatiosTemplate: React.FC<Props> = (props) => {
  return <ModularAutorizacionPatiosView {...props} />;
};
