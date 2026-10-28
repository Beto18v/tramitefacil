import React from 'react';
import { CuentaCobroData } from '../../types/documents';
import { DocumentForm } from '../../templates/freelance/cuenta_cobro';

export interface Props {
  data: CuentaCobroData;
  onChange: (updated: CuentaCobroData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CuentaCobroForm: React.FC<Props> = (props) => {
  return <DocumentForm {...props} />;
};

export default CuentaCobroForm;
