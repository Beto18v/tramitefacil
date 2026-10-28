import React from 'react';
import { AcuerdoNdaData } from '../../types/documents';
import { DocumentForm as ModularAcuerdoNdaForm } from '../../templates/comercial/acuerdo_nda';

interface Props {
  data: AcuerdoNdaData;
  onChange: (updated: AcuerdoNdaData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const AcuerdoNdaForm: React.FC<Props> = (props) => {
  return <ModularAcuerdoNdaForm {...props} />;
};
