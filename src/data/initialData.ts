import {
  AppStorageState,
  DocumentStyleConfig,
  AllDocumentsData,
  DocumentType,
} from '../types/documents';
import { DOCUMENT_DEFINITIONS, DOC_TYPE_TO_DATA_KEY } from '../templates';

export const defaultStyleConfig: DocumentStyleConfig = {
  fontFamily: 'serif',
  fontSize: 'normal',
  paperSize: 'a4',
};

/**
 * Builds the initial full application storage state dynamically
 * using the single source of truth from each template's defaultData.
 */
export function getInitialFullStorageState(): AppStorageState {
  const documents = {} as AllDocumentsData;
  for (const [docType, def] of Object.entries(DOCUMENT_DEFINITIONS)) {
    const key = DOC_TYPE_TO_DATA_KEY[docType as DocumentType];
    (documents as any)[key] = def.defaultData;
  }

  return {
    version: '1.1.0',
    selectedDocId: null,
    currentView: 'catalog',
    styleConfig: defaultStyleConfig,
    documents,
  };
}
