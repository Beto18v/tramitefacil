import React from 'react';
import { CompraventaVehiculoData, DocumentStyleConfig } from '../../types/documents';
import { DocumentView as ModularCompraventaVehiculoView } from '../../templates/vehiculos/compraventa_vehiculo';

interface Props {
  data: CompraventaVehiculoData;
  styleConfig: DocumentStyleConfig;
}

export const CompraventaVehiculoTemplate: React.FC<Props> = (props) => {
  return <ModularCompraventaVehiculoView {...props} />;
};
