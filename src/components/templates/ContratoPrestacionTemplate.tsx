import React from 'react';
import { ContratoPrestacionData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularContratoPrestacionView } from '../../templates/comercial/contrato_prestacion';

interface Props {
  data: ContratoPrestacionData;
  styleConfig: DocumentStyleConfig;
}

export const ContratoPrestacionTemplate: React.FC<Props> = (props) => {
  return <ModularContratoPrestacionView {...props} />;
};
