import React from 'react';
import { ContratoArrendamientoData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularContratoArrendamientoView } from '../../templates/inmobiliario/contrato_arrendamiento';

interface Props {
  data: ContratoArrendamientoData;
  styleConfig: DocumentStyleConfig;
}

export const ContratoArrendamientoTemplate: React.FC<Props> = (props) => {
  return <ModularContratoArrendamientoView {...props} />;
};
