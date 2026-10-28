import React from 'react';
import { AcuerdoNdaData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularAcuerdoNdaView } from '../../templates/comercial/acuerdo_nda';

interface Props {
  data: AcuerdoNdaData;
  styleConfig: DocumentStyleConfig;
}

export const AcuerdoNdaTemplate: React.FC<Props> = (props) => {
  return <ModularAcuerdoNdaView {...props} />;
};
