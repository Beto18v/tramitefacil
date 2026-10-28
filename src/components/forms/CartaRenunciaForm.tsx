import React from 'react';
import { CartaRenunciaData } from '../../types/documents';
import { DocumentForm as ModularCartaRenunciaForm } from '../../templates/laboral/carta_renuncia';

interface Props {
  data: CartaRenunciaData;
  onChange: (updated: CartaRenunciaData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CartaRenunciaForm: React.FC<Props> = (props) => {
  return <ModularCartaRenunciaForm {...props} />;
};
