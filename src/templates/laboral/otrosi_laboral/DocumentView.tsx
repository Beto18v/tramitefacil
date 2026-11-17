import React from 'react';
import { OtrosiLaboralData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { LegalDocumentShell, SignatureBlock } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<OtrosiLaboralData>> = ({
  data,
  styleConfig,
}) => {
  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: data.numeroOtrosi
          ? `${data.numeroOtrosi.toUpperCase()} AL CONTRATO DE TRABAJO`
          : 'OTROSÍ MODIFICATORIO AL CONTRATO DE TRABAJO',
        subtitle: data.tipoContratoOriginal || 'Contrato Individual de Trabajo',
        badge: 'Modificación Bilateral (C.S.T. Art. 50)',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-6 text-center italic">
            Para constancia de mutuo acuerdo y aceptación expresa, se suscribe el presente otrosí en dos ejemplares
            de igual tenor y valor legal:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <SignatureBlock
              label="POR EL EMPLEADOR:"
              signatureType="text"
              name={data.nombreRepresentanteLegal || data.nombreEmpresa || 'EMPLEADOR / REPRESENTANTE LEGAL'}
              role={data.nombreEmpresa ? `En representación de: ${data.nombreEmpresa}` : 'Representante Legal'}
              docType={data.tipoDocRepresentante || 'C.C.'}
              docNumber={data.numDocRepresentante || data.nitEmpresa || '____________________'}
              widthClass="w-full"
            />

            <SignatureBlock
              label="EL TRABAJADOR:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreTrabajador || 'TRABAJADOR'}
              role={data.cargoTrabajador || 'Trabajador'}
              docType={data.tipoDocumento || 'C.C.'}
              docNumber={data.numeroDocumento || '____________________'}
              widthClass="w-full"
            />
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-slate-900 text-xs md:text-sm">
        {/* Comparentes */}
        <div className="text-justify text-slate-800 space-y-2 leading-relaxed">
          <p>
            Entre los suscritos a saber: de una parte,{' '}
            <strong>{data.nombreEmpresa || '[NOMBRE DE LA EMPRESA O EMPLEADOR]'}</strong>
            {data.nitEmpresa ? `, con NIT ${data.nitEmpresa}` : ''}, representada legalmente en este acto por{' '}
            <strong>{data.nombreRepresentanteLegal || '[REPRESENTANTE LEGAL]'}</strong>, mayor de edad,
            identificado(a) con {data.tipoDocRepresentante || 'Cédula de Ciudadanía'} N°{' '}
            <span className="font-mono">{data.numDocRepresentante || '____________'}</span>, quien para todos
            los efectos del presente acuerdo se denominará el <strong>EMPLEADOR</strong>; y de la otra parte,{' '}
            <strong>{data.nombreTrabajador || '[NOMBRE DEL TRABAJADOR]'}</strong>, mayor de edad,
            identificado(a) con {data.tipoDocumento || 'Cédula de Ciudadanía'} N°{' '}
            <span className="font-mono">{data.numeroDocumento || '____________'}</span>, quien se desempeña en el
            cargo de <strong>{data.cargoTrabajador || '[Cargo]'}</strong>, quien en adelante se denominará el{' '}
            <strong>TRABAJADOR</strong>, hemos convenido celebrar el presente{' '}
            <strong>{data.numeroOtrosi ? data.numeroOtrosi.toUpperCase() : 'OTROSÍ MODIFICATORIO'}</strong> al{' '}
            <strong>{data.tipoContratoOriginal || 'Contrato Individual de Trabajo'}</strong>, previas las
            siguientes consideraciones:
          </p>
        </div>

        {/* Consideraciones */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-justify text-xs text-slate-800 leading-relaxed">
          <p className="font-bold text-slate-950 uppercase text-[11px] tracking-wide">Considerandos</p>
          <ol className="list-decimal list-outside ml-4 space-y-1.5 text-slate-700">
            <li>
              Que entre las partes se encuentra vigente un{' '}
              <strong>{data.tipoContratoOriginal || 'Contrato Individual de Trabajo'}</strong> suscrito el día{' '}
              <strong>{data.fechaContratoOriginal || '____-__-__'}</strong>.
            </li>
            <li>
              Que de conformidad con el artículo 50 del Código Sustantivo del Trabajo (C.S.T.) y la jurisprudencia
              laboral colombiana, todo contrato de trabajo es revisable y modificable por mutuo acuerdo entre las
              partes cuando sobrevengan circunstancias que así lo aconsejen o por acuerdo voluntario de las mismas.
            </li>
            <li>
              Que las partes de común y libre acuerdo han convenido modificar las condiciones pactadas respecto a la{' '}
              <strong>{data.clausulaModificada || 'cláusula objeto de ajuste'}</strong>.
            </li>
          </ol>
        </div>

        {/* Cláusulas del Otrosí */}
        <div className="space-y-4 text-justify text-slate-800 leading-relaxed">
          <p className="font-semibold text-slate-950">
            En virtud de lo anterior, las partes acuerdan las siguientes estipulaciones:
          </p>

          {/* Cláusula Primera */}
          <div className="space-y-1">
            <p>
              <strong className="text-slate-950">PRIMERA. OBJETO DE LA MODIFICACIÓN: </strong>
              Modificar expresamente el contenido de la{' '}
              <strong>{data.clausulaModificada || 'Cláusula objeto de modificación'}</strong> del contrato
              individual de trabajo celebrado entre las partes.
            </p>
          </div>

          {/* Cláusula Segunda: Cuadro Comparativo */}
          <div className="space-y-2">
            <p>
              <strong className="text-slate-950">SEGUNDA. NUEVA REDACCIÓN ACORDADA: </strong>
              A partir de la vigencia del presente otrosí, la cláusula modificada se leerá y aplicará en los
              siguientes términos:
            </p>

            <div className="space-y-3 pt-1">
              {/* Texto anterior */}
              <div className="border border-slate-200 bg-slate-50/70 rounded-lg p-3 text-xs">
                <span className="font-bold text-slate-600 uppercase text-[10px] block mb-1">
                  Texto o estipulación anterior:
                </span>
                <p className="text-slate-600 line-through italic whitespace-pre-line">
                  {data.textoAnterior || 'Sin texto anterior especificado'}
                </p>
              </div>

              {/* Nuevo texto */}
              <div className="border border-emerald-300 bg-emerald-50/40 rounded-lg p-3.5 text-xs">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block mb-1">
                  Nuevo texto vinculante acordado:
                </span>
                <p className="font-medium text-slate-900 whitespace-pre-line">
                  {data.textoNuevo || 'Texto nuevo acordado'}
                </p>
              </div>
            </div>
          </div>

          {/* Cláusula Tercera: Vigencia */}
          <div className="space-y-1">
            <p>
              <strong className="text-slate-950">TERCERA. FECHA DE VIGENCIA: </strong>
              La modificación acordada en el presente otrosí entrará en plena vigencia y surtirá todos sus efectos
              jurídicos a partir del próximo{' '}
              <strong className="text-slate-950">
                {data.fechaVigenciaModificacion || data.fecha || 'Fecha de vigencia'}
              </strong>
              .
            </p>
          </div>

          {/* Cláusula Cuarta: Ratificación */}
          {data.incluyeRatificacion && (
            <div className="space-y-1">
              <p>
                <strong className="text-slate-950">CUARTA. RATIFICACIÓN DE LAS DEMÁS ESTIPULACIONES: </strong>
                {data.ratificacionTexto}
              </p>
            </div>
          )}
        </div>
      </div>
    </LegalDocumentShell>
  );
};
