import React from 'react';
import { MemorandoLlamadoAtencionData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { LegalDocumentShell, SignatureBlock } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<MemorandoLlamadoAtencionData>> = ({
  data,
  styleConfig,
}) => {
  const getFaltaLabel = (tipo: string) => {
    switch (tipo) {
      case 'retardo_injustificado':
        return 'Retardo injustificado en el horario laboral';
      case 'inasistencia_injustificada':
        return 'Inasistencia injustificada a la jornada de trabajo';
      case 'incumplimiento_funciones':
        return 'Incumplimiento de funciones u obligaciones contractuales';
      case 'conducta_inapropiada':
        return 'Conducta o trato inapropiado en el entorno de trabajo';
      case 'desacato_ordenes':
        return 'Desacato o desatención a órdenes e instrucciones legítimas';
      default:
        return 'Conducta o falta sujeta a revisión disciplinaria';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'MEMORANDO DISCIPLINARIO - LLAMADO DE ATENCIÓN',
        subtitle: data.nombreEmpresa || 'EMPRESA / EMPLEADOR',
        badge: data.numeroMemorando || 'MEMORANDO',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Firma Emisor */}
            <SignatureBlock
              label="EMITIDO POR (EMPLEADOR):"
              signatureType="text"
              name={data.remitenteNombre || 'DIRECCIÓN DE GESTIÓN HUMANA'}
              role={data.remitenteCargo || 'Gestión Humana'}
              docType="Empresa"
              docNumber={data.nombreEmpresa || data.nitEmpresa || 'Empleador'}
              widthClass="w-full"
            />

            {/* Recibido / Notificación del Trabajador */}
            <div className="border border-slate-300 bg-slate-50/60 rounded-lg p-3 space-y-3">
              <p className="font-bold text-slate-900 uppercase text-[11px] tracking-wide border-b border-slate-200 pb-1">
                Constancia de Notificación y Recibido (Trabajador)
              </p>
              <div className="h-10 border-b border-slate-900" />
              <div className="space-y-1 text-xs text-slate-700">
                <p>
                  <strong>Nombre:</strong> {data.nombreTrabajador || '_____________________________'}
                </p>
                <p>
                  <strong>{data.tipoDocumento || 'C.C.'}:</strong>{' '}
                  <span className="font-mono">{data.numeroDocumento || '_________________'}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600">
                  <p>Fecha recibido: ___/___/2026</p>
                  <p>Hora: _________</p>
                </div>
                <p className="text-[10px] text-slate-500 italic pt-1">
                  Nota: La firma certifica la notificación del presente documento y no implica renuncia a su derecho de defensa.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-slate-900 text-xs md:text-sm">
        {/* Encabezado formal de memorando interno */}
        <div className="border border-slate-200 bg-slate-50 rounded-lg p-3.5 space-y-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] block">Para:</span>
              <p className="font-semibold text-slate-950">
                {data.nombreTrabajador || '[NOMBRE DEL TRABAJADOR]'}
              </p>
              <p className="text-slate-600">
                {data.cargoTrabajador || 'Colaborador'} — {data.departamentoArea || 'Área'}
              </p>
              <p className="text-slate-500 font-mono text-[11px]">
                {data.tipoDocumento || 'C.C.'} {data.numeroDocumento || ''}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] block">De:</span>
              <p className="font-semibold text-slate-950">
                {data.remitenteNombre || '[REMITENTE / EMPLEADOR]'}
              </p>
              <p className="text-slate-600">{data.remitenteCargo || 'Dirección de Gestión Humana'}</p>
              <p className="text-slate-500">{data.nombreEmpresa || ''}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-bold text-slate-700 uppercase text-[10px] mr-2">Asunto:</span>
              <span className="font-medium text-slate-900">
                Llamado de atención formal por {getFaltaLabel(data.tipoFalta).toLowerCase()}
              </span>
            </div>
            {data.numeroMemorando && (
              <span className="text-slate-500 font-mono text-[11px]">Ref: {data.numeroMemorando}</span>
            )}
          </div>
        </div>

        {/* 1. Descripción de Hechos */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
            1. Relación Fáctica de los Hechos
          </h3>
          <div className="text-justify text-slate-800 space-y-2 leading-relaxed">
            <p>
              Por medio de la presente comunicación escrita, la dirección de la empresa pone en su conocimiento
              que el día <strong>{data.fechaFalta || data.fecha || 'de la falta'}</strong> se evidenció la
              siguiente situación relacionada con el desempeño de sus labores:
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded-lg whitespace-pre-line text-slate-900">
              {data.descripcionHechos}
            </div>
          </div>
        </div>

        {/* 2. Fundamento Legal y RIT */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
            2. Fundamento Normativo y Contractual
          </h3>
          <div className="text-justify text-slate-800 space-y-2 leading-relaxed">
            <p>
              Los hechos anteriormente descritos configuran una presunta infracción a los deberes laborales y
              obligaciones contractuales, con fundamento específico en:
            </p>
            <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-amber-950 font-medium text-xs">
              {data.normaVulnerada}
            </div>
            <p className="text-[11px] text-slate-600">
              Se recuerda que todo contrato de trabajo válidamente celebrado impone al trabajador la obligación de
              acatar las órdenes e instrucciones impartidas por el empleador, cumplir los horarios pactados y
              observar una conducta armónica con sus compañeros y superiores (C.S.T. Art. 58).
            </p>
          </div>
        </div>

        {/* 3. Citación a Descargos (Opcional si aplica) */}
        {data.solicitaDescargos ? (
          <div className="space-y-2 bg-emerald-50/50 border border-emerald-200 rounded-lg p-3.5">
            <h3 className="font-bold text-emerald-950 uppercase text-xs tracking-wider border-b border-emerald-200 pb-1">
              3. Garantía del Debido Proceso y Citación a Descargos (C.S.T. Art. 115)
            </h3>
            <div className="text-justify text-slate-800 space-y-2 text-xs leading-relaxed">
              <p>
                En estricto cumplimiento del principio constitucional del debido proceso y de conformidad con el
                artículo 115 del Código Sustantivo del Trabajo y la jurisprudencia de la Corte Constitucional
                (Sentencia C-593 de 2014), se le cita formalmente a diligencia de descargos a efectos de que exponga
                libremente sus argumentos, razones o aporte los medios de prueba que estime convenientes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white border border-emerald-100 p-2.5 rounded text-xs font-medium">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Fecha</span>
                  <span className="text-slate-900">{data.fechaDescargos || data.fecha}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Hora</span>
                  <span className="text-slate-900">{data.horaDescargos || 'Por definir'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Lugar o Medio</span>
                  <span className="text-slate-900">{data.lugarDescargos || 'Oficinas de la empresa'}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                Tiene derecho a comparecer a la diligencia asistido por dos compañeros de trabajo de su elección o
                por representantes de la organización sindical si a ella perteneciere.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <h3 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
              3. Finalidad Preventiva
            </h3>
            <p className="text-justify text-slate-800 text-xs leading-relaxed">
              El presente llamado de atención tiene carácter eminentemente pedagógico y preventivo, buscando
              corregir a tiempo conductas que comprometan el normal desarrollo operativo y laboral, invitándolo a
              mantener su compromiso y excelencia en las tareas asignadas.
            </p>
          </div>
        )}

        {/* 4. Exhortación y Advertencia Disciplinaria */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">
            4. Exhortación y Advertencia de Ley
          </h3>
          <p className="text-justify text-slate-800 text-xs leading-relaxed">
            {data.advertenciaReincidencia}
          </p>
        </div>

        {/* 5. Copia Hoja de Vida */}
        {data.copiaHojaVida && (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600">
            <strong>Copia a:</strong> Archivo del trabajador en Carpeta de Talento Humano / Hoja de Vida.
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};
