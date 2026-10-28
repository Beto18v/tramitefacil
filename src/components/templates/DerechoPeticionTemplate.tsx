import React from 'react';
import { DerechoPeticionData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularDerechoPeticionView } from '../../templates/legal/derecho_peticion';

interface Props {
  data: DerechoPeticionData;
  styleConfig: DocumentStyleConfig;
}

export const DerechoPeticionTemplate: React.FC<Props> = (props) => {
  return <ModularDerechoPeticionView {...props} />;
};
