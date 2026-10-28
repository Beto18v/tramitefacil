import React from 'react';
import { CuentaCobroData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView } from '../../templates/freelance/cuenta_cobro';

export interface Props {
  data: CuentaCobroData;
  styleConfig: DocumentStyleConfig;
}

export const CuentaCobroTemplate: React.FC<Props> = (props) => {
  return <DocumentView {...props} />;
};

export default CuentaCobroTemplate;
