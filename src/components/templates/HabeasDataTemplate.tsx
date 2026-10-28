import React from 'react';
import { HabeasDataData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularHabeasDataView } from '../../templates/legal/habeas_data';

interface Props {
  data: HabeasDataData;
  styleConfig: DocumentStyleConfig;
}

export const HabeasDataTemplate: React.FC<Props> = (props) => {
  return <ModularHabeasDataView {...props} />;
};
