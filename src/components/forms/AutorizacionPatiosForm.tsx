import React from 'react';
import { AutorizacionPatiosData } from '../../types/documents';
import { DocumentForm as ModularAutorizacionPatiosForm } from '../../templates/vehiculos/autorizacion_patios';

interface Props {
  data: AutorizacionPatiosData;
  onChange: (updated: AutorizacionPatiosData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const AutorizacionPatiosForm: React.FC<Props> = (props) => {
  return <ModularAutorizacionPatiosForm {...props} />;
};
