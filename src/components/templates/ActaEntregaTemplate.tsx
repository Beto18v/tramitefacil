import React from 'react';
import { ActaEntregaData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularActaEntregaView } from '../../templates/inmobiliario/acta_entrega';

interface Props {
  data: ActaEntregaData;
  styleConfig: DocumentStyleConfig;
}

export const ActaEntregaTemplate: React.FC<Props> = (props) => {
  return <ModularActaEntregaView {...props} />;
};
