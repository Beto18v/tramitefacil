import { CompraventaVehiculoData, DocumentMeta } from '../../../types/documents';
import {
  defaultCompraventaVehiculo,
  sampleCompraventaVehiculo,
} from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'compraventa_vehiculo',
  title: 'Contrato de Compraventa de Vehículo Automotor',
  shortTitle: 'Compraventa de Vehículo',
  category: 'vehiculos',
  categoryName: 'Trámites de Tránsito & Vehículos',
  categoryIcon: 'Car',
  description:
    'Promesa y contrato de compraventa de automotores (carros, motos, camionetas) con cláusula de saneamiento, RUNT, SIMIT y división de gastos.',
  iconName: 'Car',
  lawReference: 'Código de Comercio y Ley 769 de 2002',
  tags: [
    'vehículo',
    'carro',
    'moto',
    'compraventa',
    'traspaso',
    'runt',
    'simit',
    'automotor',
  ],
  estimatedMinutes: '⚡ 4 min',
  featuredTags: ['RUNT y SIMIT', 'Ley 769 de 2002', 'Carros y Motos'],
  subfilter: 'Vehículos',
};

export const defaultData: CompraventaVehiculoData = defaultCompraventaVehiculo;
export const sampleData: CompraventaVehiculoData = sampleCompraventaVehiculo;

