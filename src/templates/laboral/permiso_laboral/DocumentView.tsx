import React from 'react';
import { PermisoLaboralData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { SignatureBlock } from '../../../components/templates/SignatureBlock';

export const DocumentView: React.FC<DocumentViewProps<PermisoLaboralData>> = ({
  data,
  styleConfig,
}) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12.5px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[15px] leading-loose'
      : 'text-[13.5px] leading-relaxed';

  const tiposLegibles: Record<PermisoLaboralData['tipoPermiso'], string> = {
    calamidad: 'Calamidad Doméstica',
    estudio: 'Permiso Académico / Estudio',
    medico: 'Cita o Procedimiento Médico',
    tramite: 'Diligencia Personal / Trámite Legal',
    no_remunerada: 'Licencia No Remunerada',
  };

  return (
    <div
      className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}
    >
      <div className="space-y-6">
        {/* Ciudad y fecha */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>
            {data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}
          </p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900">Señores:</p>
          <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
            {data.nombreEmpresa || 'NOMBRE DE LA EMPRESA'}
          </p>
          <p className="text-slate-800">
            Atención: <strong>{data.nombreJefe || 'Jefe Inmediato'}</strong>
          </p>
          <p className="text-slate-600">{data.cargoJefe || 'Dirección de Área'}</p>
          <p className="text-slate-600">{data.ciudad || 'Presente'}</p>
        </div>

        {/* Asunto */}
        <div className="border-b-2 border-slate-900 pb-2">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              Solicitud formal de {(data.tipoPermiso && tiposLegibles[data.tipoPermiso]) || 'Permiso Laboral'}
            </span>
          </p>
        </div>

        {/* Saludo */}
        <p className="text-slate-800">Respetado(a) señor(a):</p>

        {/* Cuerpo */}
        <div className="space-y-4 text-justify text-slate-800">
          <p>
            Por medio de la presente comunicación me dirijo a usted con el debido respeto, yo,{' '}
            <strong>{data.nombreEmpleado || '[NOMBRE DEL EMPLEADO]'}</strong>, mayor de edad, identificado(a) con{' '}
            <strong>
              {data.tipoDocumento} N° {data.numeroDocumento || '____________'}
            </strong>
            , quien actualmente desempeña el cargo de <strong>{data.cargoEmpleado || '[Cargo]'}</strong> en la
            organización, con el fin de solicitar formalmente su autorización para ausentarme de mi jornada laboral.
          </p>

          {/* Recuadro de Fechas y Modalidad */}
          <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg space-y-2 text-xs md:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
              <div>
                <span className="text-slate-500 block text-[11px]">Tipo de Novedad:</span>
                <strong className="text-blue-900">{(data.tipoPermiso && tiposLegibles[data.tipoPermiso]) || 'Permiso'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Días Totales Solicitados:</span>
                <span className="font-bold">{data.diasTotales || 1} día(s)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Fecha de Inicio:</span>
                <span className="font-semibold">{data.fechaInicio || 'Inicio'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Fecha de Reincorporación:</span>
                <span className="font-semibold">{data.fechaFin || 'Fin'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase text-slate-900 tracking-wider mb-1">
              Motivo y Justificación Detallada:
            </h3>
            <p className="leading-relaxed whitespace-pre-line text-slate-700">
              {data.motivoDetallado ||
                '(Indique de forma clara y respetuosa las circunstancias que motivan su solicitud...)'}
            </p>
          </div>

          {data.compensacionHoras && (
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
              <strong>Compromiso Operativo:</strong> {data.compensacionHoras}
            </p>
          )}

          {data.anexaSoportes && (
            <p className="text-xs text-slate-600">
              Se aportan los comprobantes, órdenes médicas o documentos justificativos que respaldan la presente
              solicitud.
            </p>
          )}
        </div>
      </div>

      {/* Firmas: Solicitante y Autorización de la Empresa */}
      <div className="pt-8 mt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">
          Agradeciendo de antemano su comprensión y pronta aprobación,
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          <SignatureBlock
            signatureType={data.signatureType}
            signatureDataUrl={data.signatureDataUrl}
            name={data.nombreEmpleado || 'FIRMA DEL TRABAJADOR'}
            docType={data.tipoDocumento || 'C.C.'}
            docNumber={data.numeroDocumento || '________________'}
            role={data.cargoEmpleado}
            label=""
            widthClass="w-full sm:w-64"
          />

          <div className="w-full sm:w-64 border border-slate-300 p-3 bg-slate-50 text-center text-[10px] text-slate-600">
            <p className="font-semibold text-slate-800 mb-1">Aprobación de la Empresa:</p>
            <div className="flex justify-center gap-4 my-1 text-[11px]">
              <span>[ ] Aprobado</span>
              <span>[ ] No Aprobado</span>
            </div>
            <div className="border-b border-slate-300 mx-4 my-2"></div>
            <p>Firma Jefe Inmediato / RRHH</p>
          </div>
        </div>
      </div>
    </div>
  );
};
