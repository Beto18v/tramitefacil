import { PoderAutorizacionData, DocumentMeta } from '../../../types/documents';
import { defaultPoderAutorizacion, samplePoderAutorizacion } from '../../../data/initialData';

export const meta: DocumentMeta = {
  id: 'poder_autorizacion',
  title: 'Poder Especial / Autorización Amplia a Terceros',
  shortTitle: 'Poder Especial / Autorización',
  category: 'legal',
  categoryName: 'Trámites Ciudadanos & Legales',
  categoryIcon: 'Scale',
  description:
    'Mandato con facultades expresas de radicación, firma y retiro, incluyendo espacio para firma y recuadro de huella dactilar.',
  iconName: 'Fingerprint',
  lawReference: 'Art. 2142 y ss. Código Civil y C.G.P.',
  tags: ['poder', 'autorización', 'trámite', 'tercero', 'huella', 'diligencia'],
  estimatedMinutes: '2 min',
  featuredTags: ['Facultades expresas', 'Huella dactilar', 'Código Civil'],
  subfilter: 'Poderes',
};

export const defaultData: PoderAutorizacionData = defaultPoderAutorizacion;
export const sampleData: PoderAutorizacionData = samplePoderAutorizacion;

