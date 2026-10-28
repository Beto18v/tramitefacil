import { DocumentType, AllDocumentsData } from '../types/documents';
import { getDocumentDefinition, DOC_TYPE_TO_DATA_KEY } from '../templates';

export function generarTextoPlano(docType: DocumentType, state: AllDocumentsData): string {
  const definition = getDocumentDefinition(docType);
  const dataKey = DOC_TYPE_TO_DATA_KEY[docType];
  return definition.toPlainText(state[dataKey]);
}
