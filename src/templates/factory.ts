import { DocumentDefinition, PartySignatureInfo } from './types';
import { UserProfile } from '../types/documents';

export interface CreateDocumentDefinitionInput<TData extends Record<string, any> = Record<string, any>> {
  meta: DocumentDefinition<TData>['meta'];
  defaultData: TData;
  sampleData: TData;
  dataKey?: string;
  profileFieldMap?: Partial<Record<keyof UserProfile, keyof TData>>;
  injectProfile?: (currentData: TData, profile: UserProfile) => TData;
  getSignaturesForDocx?: (data: TData) => { left: PartySignatureInfo; right?: PartySignatureInfo };
  buildDocxParagraphs?: (data: TData) => any[];
  renderView: DocumentDefinition<TData>['renderView'];
  renderForm: DocumentDefinition<TData>['renderForm'];
  toPlainText: DocumentDefinition<TData>['toPlainText'];
  calculateCompletion?: (data: TData) => number;
  getFilename?: (data: TData, ext: 'pdf' | 'docx') => string;
}

function defaultCalculateCompletion(data: Record<string, any>): number {
  if (!data || typeof data !== 'object') return 0;
  const keys = Object.keys(data).filter(
    (k) => !k.startsWith('_') && k !== 'signatureDataUrl' && k !== 'signatureType'
  );
  if (keys.length === 0) return 100;
  let filled = 0;
  for (const key of keys) {
    const val = data[key];
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val)) {
        if (val.length > 0) filled++;
      } else if (typeof val === 'object') {
        if (Object.keys(val).length > 0) filled++;
      } else {
        filled++;
      }
    }
  }
  return Math.min(100, Math.max(0, Math.round((filled / keys.length) * 100)));
}

function defaultGetFilename(
  metaTitle: string,
  data: Record<string, any>,
  ext: 'pdf' | 'docx'
): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = (metaTitle || 'Documento')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  const personOrOrg =
    data.nombre ||
    data.nombreCompleto ||
    data.nombreContratista ||
    data.nombreTrabajador ||
    data.nombreSolicitante ||
    data.nombreRemitente ||
    'Documento';

  const cleanPerson = String(personOrOrg)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 20);

  return `${cleanPrefix}_${cleanPerson}_${today}.${ext}`;
}

export function createDocumentDefinition<TData extends Record<string, any> = Record<string, any>>(
  input: CreateDocumentDefinitionInput<TData>
): DocumentDefinition<TData> {
  const calculateCompletion =
    input.calculateCompletion || ((data: TData) => defaultCalculateCompletion(data));
  const getFilename =
    input.getFilename || ((data: TData, ext: 'pdf' | 'docx') => defaultGetFilename(input.meta.title, data, ext));

  const injectProfile =
    input.injectProfile ||
    (input.profileFieldMap
      ? (currentData: TData, profile: UserProfile): TData => {
          const next = { ...currentData };
          for (const [profKey, dataKey] of Object.entries(input.profileFieldMap!)) {
            const profileVal = (profile as any)[profKey];
            if (profileVal !== undefined && profileVal !== '' && dataKey) {
              (next as any)[dataKey] = profileVal;
            }
          }
          return next;
        }
      : undefined);

  const getSignaturesForDocx =
    input.getSignaturesForDocx ||
    ((data: TData) => {
      const name =
        data.nombre ||
        data.nombreCompleto ||
        data.nombreSolicitante ||
        data.nombreTrabajador ||
        data.nombreContratista ||
        data.nombreRemitente ||
        'Firma Principal';
      const doc =
        data.numeroDocumento ||
        data.numDoc ||
        data.cedula ||
        data.identificacion ||
        undefined;
      return {
        left: {
          role: 'FIRMANTE:',
          name: String(name),
          doc: doc ? `Doc: ${doc}` : undefined,
          phone: data.telefono ? `Tel: ${data.telefono}` : undefined,
          address: data.direccion || undefined,
        },
      };
    });

  return {
    ...input,
    calculateCompletion,
    getFilename,
    injectProfile,
    getSignaturesForDocx,
  };
}
