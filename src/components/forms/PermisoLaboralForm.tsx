import React from 'react';
import { PermisoLaboralData } from '../../types/documents';
import { DocumentForm as ModularPermisoLaboralForm } from '../../templates/laboral/permiso_laboral';

interface Props {
  data: PermisoLaboralData;
  onChange: (updated: PermisoLaboralData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const PermisoLaboralForm: React.FC<Props> = (props) => {
  return <ModularPermisoLaboralForm {...props} />;
};
