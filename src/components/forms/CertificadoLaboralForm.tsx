import React from 'react';
import { CertificadoLaboralData } from '../../types/documents';
import { DocumentForm as ModularCertificadoLaboralForm } from '../../templates/laboral/certificado_laboral';

interface Props {
  data: CertificadoLaboralData;
  onChange: (updated: CertificadoLaboralData) => void;
}

export const CertificadoLaboralForm: React.FC<Props> = (props) => {
  return <ModularCertificadoLaboralForm {...props} />;
};
