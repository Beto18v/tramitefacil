import React from 'react';
import { ContratoPrestacionData } from '../../types/documents';
import { DocumentForm as ModularContratoPrestacionForm } from '../../templates/comercial/contrato_prestacion';

interface Props {
  data: ContratoPrestacionData;
  onChange: (updated: ContratoPrestacionData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const ContratoPrestacionForm: React.FC<Props> = (props) => {
  return <ModularContratoPrestacionForm {...props} />;
};
