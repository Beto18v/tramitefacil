import { ReactElement } from 'react';
import { DocumentType, DocumentCategory, DocumentStyleConfig } from '../types/documents';

export interface DocumentMetaInfo {
  id: DocumentType;
  title: string;
  shortTitle: string;
  category: DocumentCategory;
  categoryName: string;
  categoryIcon: string;
  description: string;
  iconName: string;
  lawReference: string;
  tags: string[];
  estimatedMinutes?: string;
  featuredTags?: string[];
  subfilter?: string;
}

export interface DocumentComponentProps<TData> {
  data: TData;
  styleConfig: DocumentStyleConfig;
}

export type DocumentViewProps<TData> = DocumentComponentProps<TData>;

export interface DocumentFormProps<TData> {
  data: TData;
  onChange: (updated: TData) => void;
  onSaveSignatureToProfile?: (dataUrl: string) => void;
}

export interface DocumentDefinition<TData = any> {
  meta: DocumentMetaInfo;
  defaultData: TData;
  sampleData: TData;
  renderView: (props: DocumentComponentProps<TData>) => ReactElement | null;
  renderForm: (props: DocumentFormProps<TData>) => ReactElement | null;
  toPlainText: (data: TData) => string;
  calculateCompletion: (data: TData) => number;
}
