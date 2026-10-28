import React from 'react';
import { CompraventaVehiculoData } from '../../types/documents';
import { DocumentForm as ModularCompraventaVehiculoForm } from '../../templates/vehiculos/compraventa_vehiculo';

interface Props {
  data: CompraventaVehiculoData;
  onChange: (updated: CompraventaVehiculoData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export const CompraventaVehiculoForm: React.FC<Props> = (props) => {
  return <ModularCompraventaVehiculoForm {...props} />;
};
