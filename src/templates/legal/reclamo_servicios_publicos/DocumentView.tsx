import React from 'react';
import { ReclamoServiciosPublicosData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda } from '../../../utils/numberToWords';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<ReclamoServiciosPublicosData>> = ({
  data,
  styleConfig,
}) => {
  const valorFormateado = formatearMoneda(data.valorReclamado);

  const getCalidadTexto = (calidad: string) => {
    switch (calidad) {
      case 'suscriptor':
        return 'suscriptor(a)';
      case 'propietario':
        return 'propietario(a)';
      case 'arrendatario':
        return 'arrendatario(a)';
      case 'usuario':
        return 'usuario(a) del servicio';
      default:
        return 'usuario(a)';
    }
  };

  const getServicioTexto = (tipo: string) => {
    switch (tipo) {
      case 'energia':
        return 'Energía Eléctrica';
      case 'acueducto':
        return 'Acueducto y Alcantarillado';
      case 'gas':
        return 'Gas Natural Domiciliario';
      case 'aseo':
        return 'Aseo y Recolección de Residuos';
      case 'telecomunicaciones':
        return 'Telecomunicaciones e Internet';
      default:
        return 'Servicios Públicos Domiciliarios';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="letter"
      letter={{
        cityAndDate: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
        recipient: (
          <div className="space-y-1 text-xs md:text-sm">
            <p className="font-semibold text-slate-900">Señores:</p>
            <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
              {data.empresaServicios || 'EMPRESA DE SERVICIOS PÚBLICOS DOMICILIARIOS'}
            </p>
            <p className="text-slate-700">Oficina de Peticiones, Quejas, Reclamos y Recursos (PQR)</p>
            <p className="text-slate-600 font-medium">{data.ciudadEmpresa || data.ciudad || 'Ciudad'}</p>
          </div>
        ),
        subject: `RECLAMO FORMAL Y DERECHO DE PETICIÓN EN INTERÉS PARTICULAR (LEY 142 DE 1994, ARTS. 149, 154 Y 155)`,
        reference: `Cuenta / Matrícula / NIC: ${data.cuentaContrato || '__________'} - Factura N°: ${
          data.numeroFactura || '__________'
        } - Servicio: ${getServicioTexto(data.tipoServicio)}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-6">Atentamente,</p>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <SignatureBlock
              label="EL USUARIO / PETICIONARIO:"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreUsuario}
              docType={data.tipoDocUsuario}
              docNumber={data.numDocUsuario}
              phone={data.telefonoUsuario}
              email={data.correoNotificaciones}
              address={data.direccionInmueble}
              widthClass="w-80"
            />

            <div className="w-64 border border-slate-300 p-3 bg-slate-50 text-[11px] text-slate-700">
              <p className="font-bold text-slate-900 mb-1">CONSTANCIA DE RADICACIÓN PQR:</p>
              <div className="h-6"></div>
              <p>N° Radicado / CUN: ____________________</p>
              <p>Fecha de Radicación: ___/___/2026</p>
              <p>Ventanilla / Canal Virtual Oficial</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-justify text-slate-800 leading-relaxed text-xs md:text-sm">
        {/* Comparecencia */}
        <p>
          Yo, <strong>{data.nombreUsuario || '________________'}</strong>, mayor de edad, domiciliado(a) en la ciudad de{' '}
          {data.ciudadInmueble || data.ciudad || 'esta ciudad'}, identificado(a) con {data.tipoDocUsuario} N°{' '}
          <strong>{data.numDocUsuario || '________________'}</strong>, obrando en mi calidad de{' '}
          <strong>{getCalidadTexto(data.calidadUsuario)}</strong> del inmueble ubicado en la{' '}
          <strong>{data.direccionInmueble || '[DIRECCIÓN DEL INMUEBLE]'}</strong>
          {data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}, al cual se encuentra asignada la cuenta contrato /
          matrícula N° <strong>{data.cuentaContrato || '__________'}</strong> para el suministro de{' '}
          <strong>{getServicioTexto(data.tipoServicio)}</strong>, en ejercicio del derecho fundamental de petición
          consagrado en el artículo 23 de la Constitución Política y los artículos 149, 154 y 155 de la Ley 142 de 1994,
          presento formal <strong>RECLAMO CONTRA LA FACTURA N° {data.numeroFactura || '__________'}</strong> por valor de{' '}
          <strong>{valorFormateado}</strong> correspondiente al período <strong>{data.periodoFacturado}</strong>, con
          fundamento en los siguientes:
        </p>

        {/* Hechos */}
        <div className="space-y-3">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            I. HECHOS QUE MOTIVAN EL RECLAMO
          </p>

          <p>
            <strong>PRIMERO.</strong> En la factura objeto de controversia N°{' '}
            <strong>{data.numeroFactura || '__________'}</strong> expedida por la empresa prestadora, se evidencia un
            cobro por valor de <strong>{valorFormateado}</strong>, correspondiente a un consumo facturado de{' '}
            <strong>{data.consumoCobrado || 'consumo inusitado'}</strong>.
          </p>

          <p>
            <strong>SEGUNDO. CONFIGURACIÓN DE DESVIACIÓN SIGNIFICATIVA DEL CONSUMO.</strong> El predio registra un consumo
            histórico habitual promedio de <strong>{data.consumoHistoricoPromedio || 'promedio ordinario'}</strong>. El
            volumen facturado en este período excede de manera flagrante y desproporcionada dicho parámetro histórico,
            configurándose una <strong>desviación significativa</strong> en los términos de la regulación de la Comisión de
            Regulación respectiva y el <strong>artículo 149 de la Ley 142 de 1994</strong>.
          </p>

          <p>
            <strong>TERCERO. OMISIÓN DE LA INVESTIGACIÓN PREVIA OBLIGATORIA.</strong> La empresa prestadora procedió a
            facturar y remitir al cobro dicho consumo extraordinario sin cumplir de forma previa con la obligación legal
            perentoria de investigar las causas de la desviación antes de su emisión, privando al usuario de la verificación
            técnica conjunta en el equipo de medida.
          </p>

          {data.descripcionHechos && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <p className="font-semibold text-slate-900">Detalles adicionales del reclamo:</p>
              <p className="whitespace-pre-line text-slate-700">{data.descripcionHechos}</p>
            </div>
          )}
        </div>

        {/* Fundamentos de Derecho */}
        <div className="space-y-2">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            II. FUNDAMENTOS JURÍDICOS
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
            <li>
              <strong>Artículo 149 de la Ley 142 de 1994:</strong> Obligación estricta de las empresas de investigar las
              desviaciones significativas frente a consumos anteriores. Si la empresa no realiza la investigación, se
              entenderá que el consumo es el promedio histórico.
            </li>
            <li>
              <strong>Artículo 154 de la Ley 142 de 1994:</strong> Garantía del derecho del usuario a presentar reclamos
              contra la factura y agotar la vía administrativa con los recursos de reposición y en subsidio de apelación ante
              la Superintendencia de Servicios Públicos Domiciliarios (SSPD).
            </li>
            <li>
              <strong>Artículo 155 de la Ley 142 de 1994 (PROHIBICIÓN DE SUSPENSIÓN Y NO EXIGIBILIDAD DEL PAGO DISPUTADO):</strong>{' '}
              Ninguna empresa podrá exigir la cancelación de las sumas objeto de reclamo como requisito previo para atenderlo,
              ni podrá suspender, cortar ni terminar los servicios mientras la reclamación o los recursos no hayan sido
              resueltos definitivamente.
            </li>
          </ul>
        </div>

        {/* Peticiones */}
        <div className="space-y-3">
          <p className="font-bold text-slate-950 uppercase tracking-wide border-b border-slate-200 pb-1">
            III. PETICIONES CONCRETAS
          </p>

          <ol className="list-decimal list-inside space-y-1.5 text-slate-800">
            {data.solicitaInvestigacionDesviacion && (
              <li>
                <strong>PRACTICAR VISITA TÉCNICA ESPECIALIZADA</strong> en el predio para inspeccionar y verificar la
                calibración, funcionamiento y estado metrológico del equipo de medida con intervención del usuario.
              </li>
            )}
            {data.solicitaReliquidacion && (
              <li>
                <strong>RELIQUIDAR LA FACTURA N° {data.numeroFactura || '__________'}</strong>, cobrando de conformidad con
                el artículo 149 de la Ley 142 de 1994 el promedio de consumo histórico registrado en los últimos períodos
                normales del inmueble ({data.consumoHistoricoPromedio || 'promedio histórico'}).
              </li>
            )}
            {data.solicitaNoSuspension && (
              <li>
                <strong>ABSTENERSE DE SUSPENDER O CORTAR EL SERVICIO</strong> de conformidad con el mandato perentorio del
                artículo 155 de la Ley 142 de 1994, y emitir una factura o volante de pago temporal independiente para
                cancelar los valores que no son objeto de disputa.
              </li>
            )}
            {data.peticionesAdicionales && (
              <li className="whitespace-pre-line">{data.peticionesAdicionales}</li>
            )}
          </ol>
        </div>

        {/* Anexos */}
        {data.anexos && (
          <div className="space-y-1 text-xs text-slate-700">
            <p className="font-bold text-slate-900 uppercase">IV. ANEXOS</p>
            <p className="whitespace-pre-line pl-2">{data.anexos}</p>
          </div>
        )}

        {/* Notificaciones */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
          <p className="font-bold text-slate-900 uppercase">V. NOTIFICACIONES</p>
          <p>
            Solicito que la decisión motivada de este reclamo sea notificada en los términos del Código de Procedimiento
            Administrativo y de lo Contencioso Administrativo (CPACA) a:
          </p>
          <p>
            Dirección del predio: <strong>{data.direccionInmueble || '________________'}</strong>{' '}
            {data.ciudadInmueble ? `(${data.ciudadInmueble})` : ''}
          </p>
          <p>
            Correo electrónico para notificación judicial: <strong>{data.correoNotificaciones || '________________'}</strong>
          </p>
          {data.telefonoUsuario && <p>Teléfono de contacto: {data.telefonoUsuario}</p>}
        </div>
      </div>
    </LegalDocumentShell>
  );
};
