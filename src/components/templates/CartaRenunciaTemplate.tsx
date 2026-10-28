import React from 'react';
import { CartaRenunciaData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularCartaRenunciaView } from '../../templates/laboral/carta_renuncia';

interface Props {
  data: CartaRenunciaData;
  styleConfig: DocumentStyleConfig;
}

export const CartaRenunciaTemplate: React.FC<Props> = (props) => {
  return <ModularCartaRenunciaView {...props} />;
};
