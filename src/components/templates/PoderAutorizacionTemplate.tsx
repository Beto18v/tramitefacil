import React from 'react';
import { PoderAutorizacionData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularPoderAutorizacionView } from '../../templates/legal/poder_autorizacion';

interface Props {
  data: PoderAutorizacionData;
  styleConfig: DocumentStyleConfig;
}

export const PoderAutorizacionTemplate: React.FC<Props> = (props) => {
  return <ModularPoderAutorizacionView {...props} />;
};
