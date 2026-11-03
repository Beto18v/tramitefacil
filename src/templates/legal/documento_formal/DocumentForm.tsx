import React from 'react';
import { DocumentoFormalData } from '../../../types/documents';
import { DocumentFormProps } from '../../types';
import { InputField, TextareaField } from '../../../components/ui';
import { FileText, Building2, User, Scale, ListOrdered } from 'lucide-react';

export const DocumentForm: React.FC<DocumentFormProps<DocumentoFormalData>> = ({
  data,
  onChange,
}) => {
  const updateField = <K extends keyof DocumentoFormalData>(
    field: K,
    value: DocumentoFormalData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const updateRecipient = (field: keyof DocumentoFormalData['recipient'], value: string) => {
    onChange({
      ...data,
      recipient: {
        ...data.recipient,
        [field]: value,
      },
    });
  };

  const updateFirstSignature = (field: 'name' | 'idNumber' | 'phone' | 'email', value: string) => {
    const currentSignatures = data.signatures && data.signatures.length > 0
      ? [...data.signatures]
      : [{ role: 'SOLICITANTE', name: '', idNumber: '', phone: '', email: '' }];

    currentSignatures[0] = {
      ...currentSignatures[0],
      [field]: value,
    };

    onChange({
      ...data,
      signatures: currentSignatures,
    });
  };

  return (
    <div className="space-y-6">
      {/* Sección 1: Información del Documento */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Encabezado y Asunto
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Título del Documento"
            value={data.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('title', e.target.value)}
            placeholder="Ej. REQUERIMIENTO FORMAL DE ENTREGA"
          />
          <InputField
            label="Ciudad y Fecha"
            value={data.cityAndDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('cityAndDate', e.target.value)}
            placeholder="Bogotá D.C., 3 de noviembre de 2026"
          />
        </div>

        <InputField
          label="Asunto / Referencia"
          value={data.subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('subject', e.target.value)}
          placeholder="ASUNTO: Reclamación formal por incumplimiento..."
        />
      </div>

      {/* Sección 2: A quién va dirigido */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            A quién va dirigido (Destinatario)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Nombre o Entidad"
            value={data.recipient?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRecipient('name', e.target.value)}
            placeholder="Ej. SEÑORES ADMINISTRACIÓN DEL EDIFICIO"
          />
          <InputField
            label="Cargo o Empresa (Opcional)"
            value={data.recipient?.titleOrCompany || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRecipient('titleOrCompany', e.target.value)}
            placeholder="Ej. Representante Legal"
          />
        </div>

        <InputField
          label="Dirección o Correo del Destinatario (Opcional)"
          value={data.recipient?.address || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRecipient('address', e.target.value)}
          placeholder="Ej. Carrera 15 # 85-30, Oficina 401"
        />
      </div>

      {/* Sección 3: Hechos y Antecedentes */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <ListOrdered className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Hechos y Antecedentes (Separados por renglones)
          </h3>
        </div>

        <TextareaField
          label="Hechos que sustentan tu solicitud"
          value={(data.facts || []).join('\n\n')}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateField(
              'facts',
              e.target.value
                .split('\n\n')
                .map((f: string) => f.trim())
                .filter(Boolean)
            )
          }
          rows={5}
          placeholder="Describe los hechos separándolos por párrafos..."
        />
      </div>

      {/* Sección 4: Fundamentos de Derecho */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Leyes y Fundamentos de Derecho
          </h3>
        </div>

        <TextareaField
          label="Normas o artículos aplicables (separados por renglón)"
          value={(data.legalBasis || []).join('\n')}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateField(
              'legalBasis',
              e.target.value
                .split('\n')
                .map((l: string) => l.trim())
                .filter(Boolean)
            )
          }
          rows={3}
          placeholder="Ej. Artículo 23 de la Constitución Política..."
        />
      </div>

      {/* Sección 5: Peticiones */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Peticiones y Solicitudes
          </h3>
        </div>

        <TextareaField
          label="Peticiones o requerimientos (separados por párrafos)"
          value={(data.petitions || []).join('\n\n')}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateField(
              'petitions',
              e.target.value
                .split('\n\n')
                .map((p: string) => p.trim())
                .filter(Boolean)
            )
          }
          rows={4}
          placeholder="1. Solicito que se ordene la reparación inmediata..."
        />
      </div>

      {/* Sección 6: Datos de quien firma */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Tus Datos (Firma del Solicitante)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Tu Nombre Completo"
            value={data.signatures?.[0]?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFirstSignature('name', e.target.value)}
            placeholder="Juan Pérez Gómez"
          />
          <InputField
            label="Documento de Identidad"
            value={data.signatures?.[0]?.idNumber || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFirstSignature('idNumber', e.target.value)}
            placeholder="C.C. No. 1.020.304.506"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Teléfono de Contacto"
            value={data.signatures?.[0]?.phone || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFirstSignature('phone', e.target.value)}
            placeholder="+57 300 123 4567"
          />
          <InputField
            label="Correo Electrónico"
            value={data.signatures?.[0]?.email || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFirstSignature('email', e.target.value)}
            placeholder="tu-correo@ejemplo.com"
          />
        </div>
      </div>
    </div>
  );
};
