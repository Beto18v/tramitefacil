import React from 'react';
import { DerechoPeticionData } from '../../types/documents';
import { DocumentForm as ModularDerechoPeticionForm } from '../../templates/legal/derecho_peticion';

interface Props {
  data: DerechoPeticionData;
  onChange: (updated: DerechoPeticionData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const DerechoPeticionForm: React.FC<Props> = (props) => {
  return <ModularDerechoPeticionForm {...props} />;
};
