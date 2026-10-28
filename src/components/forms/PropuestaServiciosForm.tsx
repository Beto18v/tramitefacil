import React from 'react';
import { PropuestaServiciosData } from '../../types/documents';
import { DocumentForm } from '../../templates/freelance/propuesta_servicios';

export interface Props {
  data: PropuestaServiciosData;
  onChange: (updated: PropuestaServiciosData) => void;
}

export const PropuestaServiciosForm: React.FC<Props> = (props) => {
  return <DocumentForm {...props} />;
};

export default PropuestaServiciosForm;
