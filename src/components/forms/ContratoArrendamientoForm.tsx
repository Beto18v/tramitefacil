import React from 'react';
import { ContratoArrendamientoData } from '../../types/documents';
import { DocumentForm as ModularContratoArrendamientoForm } from '../../templates/inmobiliario/contrato_arrendamiento';

interface Props {
  data: ContratoArrendamientoData;
  onChange: (updated: ContratoArrendamientoData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const ContratoArrendamientoForm: React.FC<Props> = (props) => {
  return <ModularContratoArrendamientoForm {...props} />;
};
