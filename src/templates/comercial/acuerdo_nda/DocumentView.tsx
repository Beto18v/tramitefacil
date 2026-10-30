import React from 'react';
import { AcuerdoNdaData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<AcuerdoNdaData>> = ({
  data,
  styleConfig,
}) => {
  const isBilateral = data.tipoNda === 'bilateral';

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="dense"
      headerType="banner"
      banner={{
        align: 'center',
        title: `Acuerdo de Confidencialidad y No Divulgación (${isBilateral ? 'Bilateral' : 'Unilateral'})`,
        subtitle: 'Protección de Secretos Comerciales, Información Reservada y Propiedad Intelectual',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
      }}
      contentClassName="space-y-4"
      signatures={
        <div className="pt-6 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-6">
            En señal de plena conformidad con el contenido de las cláusulas, se firma el presente acuerdo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
            <SignatureBlock
              label={isBilateral ? 'POR LA PARTE A:' : 'POR LA PARTE DIVULGANTE:'}
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreParteEmisora}
              docType={data.tipoDocEmisora}
              docNumber={data.numDocEmisora}
              address={data.domicilioEmisora}
              widthClass="w-full"
            />

            <SignatureBlock
              label={isBilateral ? 'POR LA PARTE B:' : 'POR LA PARTE RECEPTORA:'}
              signatureType="text"
              name={data.nombreParteReceptora}
              docType={data.tipoDocReceptora}
              docNumber={data.numDocReceptora}
              address={data.domicilioReceptora}
              widthClass="w-full"
            />
          </div>
        </div>
      }
    >
      {/* Comparentes */}
      <div className="text-justify text-slate-800 space-y-2">
        <p>
          Entre los suscritos a saber: de una parte,{' '}
          <strong>{data.nombreParteEmisora || '[PARTE EMISORA]'}</strong>, identificada con{' '}
          {data.tipoDocEmisora} N° <strong>{data.numDocEmisora || '____________'}</strong>, con domicilio
          en {data.domicilioEmisora || 'esta ciudad'}, quien en adelante se denominará la{' '}
          <strong>{isBilateral ? 'PARTE A' : 'PARTE DIVULGANTE'}</strong>; y de la otra parte,{' '}
          <strong>{data.nombreParteReceptora || '[PARTE RECEPTORA]'}</strong>, identificada con{' '}
          {data.tipoDocReceptora} N° <strong>{data.numDocReceptora || '____________'}</strong>, domiciliada
          en {data.domicilioReceptora || 'esta ciudad'}, quien en adelante se denominará la{' '}
          <strong>{isBilateral ? 'PARTE B' : 'PARTE RECEPTORA'}</strong> (quienes conjuntamente se
          denominarán las "Partes"), hemos convenido celebrar el presente ACUERDO DE CONFIDENCIALIDAD
          conforme a las siguientes consideraciones y cláusulas:
        </p>
      </div>

      {/* Cláusulas */}
      <div className="space-y-2.5 text-justify text-slate-800">
        <div>
          <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
            PRIMERA. PROPÓSITO DE LA REVELACIÓN:
          </h2>
          <p className="leading-relaxed">
            Las Partes han decidido entablar conversaciones y compartir información técnica, financiera,
            comercial y estratégica con el exclusivo propósito de:{' '}
            <strong>{data.propositoNegociacion || '(Defina el propósito del acuerdo...)'}</strong>. Queda
            expresamente prohibido destinar la información recibida a cualquier otra actividad ajena a este
            propósito.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
            SEGUNDA. DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL:
          </h2>
          <p className="leading-relaxed">
            Se entiende por "Información Confidencial" toda información técnica, operativa, know-how,
            algoritmos, bases de datos, listados de clientes, modelos de negocio, proyecciones financieras o
            ideas no divulgadas públicamente, transmitida de forma verbal, escrita, digital o mediante
            demostraciones, sea identificada o no como reservada.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
            TERCERA. OBLIGACIONES DE CUSTODIA Y NO DIVULGACIÓN:
          </h2>
          <p className="leading-relaxed">
            La parte receptora se compromete a: (i) Mantener estricta reserva y confidencialidad respecto a
            la información recibida; (ii) No copiar, reproducir ni compartir dicha información con terceros
            sin consentimiento previo y por escrito; (iii) Aplicar al menos el mismo grado de diligencia y
            cuidado que emplea para la protección de sus propios secretos empresariales de igual valor; (iv)
            Restringir el acceso exclusivamente a los empleados o colaboradores que deban conocerla para el
            cumplimiento del propósito.
          </p>
        </div>

        {data.incluirExclusionesEstandar && (
          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              CUARTA. EXCLUSIONES DE CONFIDENCIALIDAD:
            </h2>
            <p className="leading-relaxed text-[11px] text-slate-600">
              No estará sujeta a confidencialidad aquella información que: (a) Fuere de dominio público sin
              mediar incumplimiento de este acuerdo; (b) Ya estuviere en posesión legítima de la parte
              receptora antes de la revelación; (c) Sea requerida por orden imperativa de autoridad judicial
              o administrativa competente, previa notificación oportuna a la parte divulgante.
            </p>
          </div>
        )}

        <div>
          <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
            QUINTA. VIGENCIA Y DURACIÓN:
          </h2>
          <p className="leading-relaxed">
            Las obligaciones de confidencialidad y no divulgación permanecerán plenamente vigentes durante un
            plazo de <strong>{data.duracionAnos || 3} años</strong> contados a partir de la firma del
            presente acuerdo, incluso tras la terminación de cualquier negociación o vinculación contractual
            entre las partes.
          </p>
        </div>

        {data.clausulaPenalMonto > 0 && (
          <div>
            <h2 className="font-bold text-slate-950 uppercase text-xs border-b border-slate-200 pb-0.5 mb-1">
              SEXTA. CLÁUSULA PENAL E INDEMNIZACIÓN:
            </h2>
            <p className="leading-relaxed text-[11px] text-slate-700">
              En caso de divulgación, uso no autorizado o filtración de la Información Confidencial imputable
              a la parte receptora, ésta deberá pagar de manera inmediata y a título de indemnización tasada
              anticipadamente la suma de{' '}
              <strong className="font-mono text-slate-950">
                {formatearMoneda(data.clausulaPenalMonto)}
              </strong>{' '}
              ({numeroALetras(data.clausulaPenalMonto)}), sin perjuicio del cobro de los perjuicios
              adicionales demostrados en juicio y de las acciones penales por violación de reserva comercial
              (Art. 308 C.P.).
            </p>
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};
