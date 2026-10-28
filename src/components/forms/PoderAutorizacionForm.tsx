import React from 'react';
import { PoderAutorizacionData } from '../../types/documents';
import { DocumentForm as ModularPoderAutorizacionForm } from '../../templates/legal/poder_autorizacion';

interface Props {
  data: PoderAutorizacionData;
  onChange: (updated: PoderAutorizacionData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const PoderAutorizacionForm: React.FC<Props> = (props) => {
  return <ModularPoderAutorizacionForm {...props} />;
};
