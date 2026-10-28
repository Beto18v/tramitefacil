import React from 'react';
import { PermisoLaboralData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularPermisoLaboralView } from '../../templates/laboral/permiso_laboral';

interface Props {
  data: PermisoLaboralData;
  styleConfig: DocumentStyleConfig;
}

export const PermisoLaboralTemplate: React.FC<Props> = (props) => {
  return <ModularPermisoLaboralView {...props} />;
};
