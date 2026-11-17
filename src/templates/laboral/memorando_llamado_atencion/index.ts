import React from 'react';
import { MemorandoLlamadoAtencionData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: MemorandoLlamadoAtencionData): string {
  return `MEMORANDO DISCIPLINARIO - LLAMADO DE ATENCIÓN
Ref: ${data.numeroMemorando || 'MEMORANDO'}
Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

DE: ${data.remitenteNombre || 'EMPLEADOR'} (${data.remitenteCargo || 'Gestión Humana'}) - ${data.nombreEmpresa || ''}
PARA: ${data.nombreTrabajador || 'TRABAJADOR'} (${data.cargoTrabajador || ''})
${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || ''}
Departamento: ${data.departamentoArea || ''}

ASUNTO: Llamado de atención disciplinario

1. HECHOS:
El día ${data.fechaFalta || data.fecha || 'de la falta'} se evidenció la siguiente situación:
${data.descripcionHechos || ''}

2. FUNDAMENTO NORMATIVO:
${data.normaVulnerada || ''}

${
  data.solicitaDescargos
    ? `3. CITACIÓN A DESCARGOS (C.S.T. Art. 115):
Se le cita formalmente a diligencia de descargos el día ${data.fechaDescargos || ''} a las ${data.horaDescargos || ''} en ${data.lugarDescargos || ''}. Tiene derecho a asistir acompañado por dos compañeros de trabajo.`
    : '3. FINALIDAD PREVENTIVA: Este memorando tiene carácter preventivo y pedagógico.'
}

4. ADVERTENCIA:
${data.advertenciaReincidencia || ''}

${data.copiaHojaVida ? 'Con copia a la Hoja de Vida del trabajador.' : ''}

_____________________________
EMITIDO POR:
${data.remitenteNombre || 'DIRECCIÓN'}
${data.remitenteCargo || ''}
${data.nombreEmpresa || ''}

_____________________________
RECIBIDO Y NOTIFICADO:
${data.nombreTrabajador || 'TRABAJADOR'}
${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || ''}
Fecha de recibido: ____________________ Hora: _________`;
}

export function calculateCompletion(data: MemorandoLlamadoAtencionData): number {
  const fields = [
    data.nombreEmpresa,
    data.remitenteNombre,
    data.nombreTrabajador,
    data.numeroDocumento,
    data.cargoTrabajador,
    data.fechaFalta,
    data.descripcionHechos,
    data.normaVulnerada,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: MemorandoLlamadoAtencionData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Memorando_Disciplinario';
  const person = (data.nombreTrabajador || 'Trabajador')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const memorandoLlamadoAtencionDefinition =
  createDocumentDefinition<MemorandoLlamadoAtencionData>({
    meta,
    defaultData,
    sampleData,
    dataKey: 'memorandoLlamadoAtencion',
    renderView: (props) => React.createElement(DocumentView, props),
    renderForm: (props) => React.createElement(DocumentForm, props),
    toPlainText,
    calculateCompletion,
    getFilename,
    profileFieldMap: {
      nombreCompleto: 'nombreTrabajador',
      numeroDocumento: 'numeroDocumento',
      tipoDocumento: 'tipoDocumento',
      ciudad: 'ciudad',
      cargoOProfesion: 'cargoTrabajador',
    },
    getSignaturesForDocx: (data) => ({
      left: {
        role: 'EMITIDO POR (EMPLEADOR):',
        name: data.remitenteNombre || data.nombreEmpresa || 'EMPLEADOR',
        doc: data.remitenteCargo || undefined,
        note: data.nombreEmpresa,
      },
      right: {
        role: 'NOTIFICACIÓN Y RECIBIDO (TRABAJADOR):',
        name: data.nombreTrabajador || 'TRABAJADOR',
        doc: `${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || '________________'}`,
        note: 'Fecha y hora de radicación',
      },
    }),
  });

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
