import React from 'react';
import { HabeasDataData } from '../../types/documents';
import { DocumentForm as ModularHabeasDataForm } from '../../templates/legal/habeas_data';

interface Props {
  data: HabeasDataData;
  onChange: (updated: HabeasDataData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const HabeasDataForm: React.FC<Props> = (props) => {
  return <ModularHabeasDataForm {...props} />;
};
