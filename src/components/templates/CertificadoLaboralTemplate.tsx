import React from 'react';
import { CertificadoLaboralData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularCertificadoLaboralView } from '../../templates/laboral/certificado_laboral';

interface Props {
  data: CertificadoLaboralData;
  styleConfig: DocumentStyleConfig;
}

export const CertificadoLaboralTemplate: React.FC<Props> = (props) => {
  return <ModularCertificadoLaboralView {...props} />;
};
