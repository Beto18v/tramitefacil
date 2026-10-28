import React from 'react';
import { NoRenovacionArriendoData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularNoRenovacionArriendoView } from '../../templates/inmobiliario/no_renovacion_arriendo';

interface Props {
  data: NoRenovacionArriendoData;
  styleConfig: DocumentStyleConfig;
}

export const NoRenovacionArriendoTemplate: React.FC<Props> = (props) => {
  return <ModularNoRenovacionArriendoView {...props} />;
};
