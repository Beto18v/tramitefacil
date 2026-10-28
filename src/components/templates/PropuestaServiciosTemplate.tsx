import React from 'react';
import { PropuestaServiciosData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView } from '../../templates/freelance/propuesta_servicios';

export interface Props {
  data: PropuestaServiciosData;
  styleConfig: DocumentStyleConfig;
}

export const PropuestaServiciosTemplate: React.FC<Props> = (props) => {
  return <DocumentView {...props} />;
};

export default PropuestaServiciosTemplate;
