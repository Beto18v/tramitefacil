import { NoRenovacionArriendoData, DocumentMeta } from '../../../types/documents';
import { defaultNoRenovacionArriendo, sampleNoRenovacionArriendo } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'no_renovacion_arriendo',
  title: 'Notificación de No Renovación de Arrendamiento',
  shortTitle: 'No Renovación Arriendo',
  category: 'inmobiliario',
  categoryName: 'Inmobiliario & Propiedad',
  categoryIcon: 'Home',
  description:
    'Aviso formal con preaviso legal de 3 meses para terminación o no prórroga de contrato de arrendamiento sin penalidad.',
  iconName: 'Home',
  lawReference: 'Ley 820 de 2003 (Régimen de Arrendamiento)',
  tags: ['arriendo', 'terminación', 'inmueble', 'desalojo', 'preaviso', 'casa'],
  estimatedMinutes: '2 min',
  featuredTags: ['Preaviso 3 meses', 'Ley 820 de 2003', 'Sin penalidad'],
  subfilter: 'Terminación',
};

export const defaultData: NoRenovacionArriendoData = defaultNoRenovacionArriendo;
export const sampleData: NoRenovacionArriendoData = sampleNoRenovacionArriendo;

