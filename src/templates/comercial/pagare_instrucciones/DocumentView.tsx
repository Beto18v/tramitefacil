import React from 'react';
import { PagareInstruccionesData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';
import { LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<PagareInstruccionesData>> = ({
  data,
  styleConfig,
}) => {
  const capitalFormateado = formatearMoneda(data.capital);
  const capitalLetrasTexto = data.capitalLetras || numeroALetras(data.capital);

  const getVencimientoTexto = () => {
    switch (data.tipoVencimiento) {
      case 'a_la_vista':
        return 'A LA VISTA (A su presentación)';
      case 'segun_instrucciones':
        return 'SEGÚN CARTA DE INSTRUCCIONES ADJUNTA';
      case 'fecha_fija':
      default:
        return data.fechaVencimiento || 'A la fecha acordada';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'PAGARÉ INDIVIDUAL O SOLIDARIO',
        subtitle: 'Título Valor Ejecutivo de Contenido Crediticio (Arts. 622 y 709 a 711 del Código de Comercio)',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fechaSuscripcion || 'Fecha'}`,
        badge: `PAGARÉ N° ${data.numeroPagare || '001'}`,
      }}
      signatures={
        <div className="pt-6 border-t border-slate-300">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4 text-center">
            Otorgamiento y Suscripción del Título Valor y Carta de Instrucciones
          </p>

          <div
            className={`grid grid-cols-1 ${
              data.incluirCodeudor ? 'md:grid-cols-2' : 'max-w-md mx-auto'
            } gap-6 items-start`}
          >
            {/* Firma Deudor Principal */}
            <div className="border border-slate-200 p-4 bg-slate-50/60 rounded">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2">
                Deudor Principal (Otorgante):
              </p>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <div className="border-b-2 border-slate-900 mb-2 h-14" />
                  <p className="font-bold text-slate-950 uppercase text-xs">
                    {data.nombreDeudor || 'NOMBRE DEL DEUDOR'}
                  </p>
                  <p className="text-[11px] text-slate-700">
                    {data.tipoDocDeudor}:{' '}
                    <span className="font-mono">{data.numDocDeudor || '________________'}</span>
                  </p>
                  {data.ciudadDeudor && (
                    <p className="text-[10px] text-slate-500">Ciudad: {data.ciudadDeudor}</p>
                  )}
                  {data.direccionDeudor && (
                    <p className="text-[10px] text-slate-500">Dir: {data.direccionDeudor}</p>
                  )}
                  {data.telefonoDeudor && (
                    <p className="text-[10px] text-slate-500">Tel: {data.telefonoDeudor}</p>
                  )}
                </div>

                {data.incluirHuella && (
                  <div className="w-20 h-24 border-2 border-dashed border-slate-400 bg-white flex flex-col justify-between items-center p-1 text-center shrink-0">
                    <span className="text-[8px] text-slate-500 uppercase font-semibold">Índice Derecho</span>
                    <div className="my-auto text-slate-400 text-[10px]">Huella</div>
                    <span className="text-[7px] text-slate-400">Deudor</span>
                  </div>
                )}
              </div>
            </div>

            {/* Firma Codeudor Solidario */}
            {data.incluirCodeudor && (
              <div className="border border-slate-200 p-4 bg-slate-50/60 rounded">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  Codeudor / Avalista Solidario:
                </p>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <div className="border-b-2 border-slate-900 mb-2 h-14" />
                    <p className="font-bold text-slate-950 uppercase text-xs">
                      {data.nombreCodeudor || 'NOMBRE DEL CODEUDOR'}
                    </p>
                    <p className="text-[11px] text-slate-700">
                      {data.tipoDocCodeudor}:{' '}
                      <span className="font-mono">{data.numDocCodeudor || '________________'}</span>
                    </p>
                    {data.ciudadCodeudor && (
                      <p className="text-[10px] text-slate-500">Ciudad: {data.ciudadCodeudor}</p>
                    )}
                    {data.direccionCodeudor && (
                      <p className="text-[10px] text-slate-500">Dir: {data.direccionCodeudor}</p>
                    )}
                    {data.telefonoCodeudor && (
                      <p className="text-[10px] text-slate-500">Tel: {data.telefonoCodeudor}</p>
                    )}
                  </div>

                  {data.incluirHuella && (
                    <div className="w-20 h-24 border-2 border-dashed border-slate-400 bg-white flex flex-col justify-between items-center p-1 text-center shrink-0">
                      <span className="text-[8px] text-slate-500 uppercase font-semibold">Índice Derecho</span>
                      <div className="my-auto text-slate-400 text-[10px]">Huella</div>
                      <span className="text-[7px] text-slate-400">Codeudor</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-4 text-justify text-slate-800 text-xs md:text-[13px] leading-relaxed">
        {/* Recuadro Superior de Monto y Fechas */}
        <div className="border-2 border-emerald-950/20 bg-emerald-50/40 p-3.5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-900">Capital adeudado:</p>
              <p className="text-base font-extrabold text-slate-950 font-mono tracking-tight">
                {capitalFormateado}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-900">Fecha de suscripción:</p>
              <p className="font-semibold text-slate-900">{data.fechaSuscripcion || 'No indicada'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-900">Fecha de vencimiento:</p>
              <p className="font-semibold text-slate-900">{getVencimientoTexto()}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-900/10 text-[11px] text-slate-800">
            <span className="font-bold text-slate-900">Suma en letras: </span>
            <span className="font-semibold uppercase">{capitalLetrasTexto}</span>
          </div>
        </div>

        {/* Cláusula Primera: Promesa Incondicional de Pago */}
        <p>
          <strong>PRIMERA. PROMESA INCONDICIONAL DE PAGO:</strong> Yo (Nosotros),{' '}
          <strong>{data.nombreDeudor || '[NOMBRE DEL DEUDOR]'}</strong>, identificado(a) con{' '}
          <strong>
            {data.tipoDocDeudor} N° {data.numDocDeudor || '____________'}
          </strong>
          {data.ciudadDeudor ? ` de ${data.ciudadDeudor}` : ''}, en calidad de{' '}
          <strong>DEUDOR(A) PRINCIPAL</strong>
          {data.incluirCodeudor ? (
            <span>
              , y <strong>{data.nombreCodeudor || '[NOMBRE DEL CODEUDOR]'}</strong>, identificado(a) con{' '}
              <strong>
                {data.tipoDocCodeudor} N° {data.numDocCodeudor || '____________'}
              </strong>
              {data.ciudadCodeudor ? ` de ${data.ciudadCodeudor}` : ''}, en calidad de{' '}
              <strong>CODEUDOR(A) SOLIDARIO(A)</strong>
            </span>
          ) : null}
          , por medio del presente título valor prometo(emos) pagar incondicionalmente a la orden o al
          legítimo tenedor, o a favor de{' '}
          <strong>{data.nombreAcreedor || '[NOMBRE DEL ACREEDOR O ENTIDAD]'}</strong>, con{' '}
          {data.tipoDocAcreedor} N° {data.numDocAcreedor || '____________'}, en la ciudad de{' '}
          {data.ciudadAcreedor || data.ciudad || 'esta ciudad'}, la suma cierta de{' '}
          <strong>{capitalLetrasTexto}</strong> ({capitalFormateado}), junto con los intereses aquí
          estipulados.
        </p>

        {/* Cláusula Segunda: Intereses Corrientes y Moratorios */}
        <p>
          <strong>SEGUNDA. INTERESES CORRIENTES Y DE MORA:</strong> Sobre la suma adeudada se reconocerán y
          pagarán intereses corrientes a una tasa fija mensual de{' '}
          <strong>{data.tasaInteresCorrienteMensual ?? 0}%</strong> mes vencido. En caso de mora en el pago
          del capital o de los intereses en las fechas señaladas, se causarán intereses de mora calculados a
          la <strong>{data.tasaInteresMora}</strong>, sin perjuicio de las demás acciones ejecutivas a que
          haya lugar.
        </p>

        {/* Cláusula Tercera: Cláusula de Aceleración y Renuncias */}
        <p>
          <strong>TERCERA. CLÁUSULA DE ACELERACIÓN Y RENUNCIA A REQUERIMIENTOS:</strong>{' '}
          {data.clausulaAceleracion && (
            <span>
              El incumplimiento o simple retardo en el pago oportuno de una o más cuotas del crédito, de los
              intereses debidos, o de cualquier obligación derivada del presente título valor, facultará al
              acreedor o tenedor legítimo para declarar extinguido o de plazo vencido la totalidad del saldo
              de la deuda y exigir de inmediato el pago judicial o extrajudicial del saldo total insoluto.
            </span>
          )}{' '}
          {data.renunciaRequerimientos && (
            <span>
              Los otorgantes declaramos expresamente que renunciamos en forma irrevocable a los
              requerimientos legales para constitución en mora, a la presentación para el pago, al aviso de
              rechazo y a la formalidad del protesto (Arts. 622, 709 y 795 del Código de Comercio).
            </span>
          )}
        </p>

        {/* Cláusula Cuarta: Solidaridad si hay codeudor */}
        {data.incluirCodeudor && (
          <p>
            <strong>CUARTA. SOLIDARIDAD E INCONDICIONALIDAD:</strong> Quien suscribe en calidad de
            Codeudor(a) se obliga de manera expresa, solidaria e indivisible respecto de todas y cada una de
            las obligaciones pecuniarias contenidas en este título valor, renunciando expresamente a los
            beneficios de división y excusión consagrados en el Código Civil colombiano.
          </p>
        )}

        {/* Cláusula Quinta: Gastos y Costas de Cobranza */}
        <p>
          <strong>
            {data.incluirCodeudor ? 'QUINTA' : 'CUARTA'}. GASTOS Y COSTAS JUDICIALES:
          </strong>{' '}
          Todos los gastos notariales, honorarios profesionales de cobranza prejudicial y costas procesales
          que genere la recuperación efectiva del importe de este título valor serán de cargo exclusivo del
          Deudor y del Codeudor solidario.
        </p>

        {/* Sección Especial: Carta de Instrucciones */}
        {data.incluirCartaInstrucciones && (
          <div className="mt-5 pt-4 border-t-2 border-slate-900">
            <div className="bg-amber-50/50 border border-amber-300/80 p-3.5 rounded mb-3">
              <h3 className="font-bold text-slate-950 uppercase text-xs tracking-wider text-center">
                CARTA DE INSTRUCCIONES PARA EL LLENADO DE ESPACIOS EN BLANCO
              </h3>
              <p className="text-[11px] text-amber-900 font-medium text-center mt-0.5">
                (Artículo 622 del Código de Comercio de Colombia)
              </p>
            </div>

            <p className="mb-2">
              Señores:{' '}
              <strong>{data.nombreAcreedor || '[NOMBRE O RAZÓN SOCIAL DEL ACREEDOR]'}</strong>
              <br />
              {data.ciudadAcreedor || data.ciudad}, {data.fechaSuscripcion}
            </p>

            <p className="mb-2">
              Por medio del presente escrito, en nuestra condición de Deudor Principal y Codeudor(a)
              Solidario(a) del Pagaré N° <strong>{data.numeroPagare || '001'}</strong>, manifestamos de
              manera libre y voluntaria que{' '}
              <strong>AUTORIZAMOS EXPRESA, INDIVIDUAL E IRREVOCABLEMENTE</strong> al tenedor legítimo del
              título valor para que proceda a diligenciar los espacios en blanco dejados en el pagaré que se
              suscribe conjuntamente con esta carta, bajo las siguientes pautas e instrucciones:
            </p>

            <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-700">
              <li>
                <strong>Monto o cuantía del título:</strong> Podrá incorporarse en letras y números el saldo
                total neto exigible que adeude el deudor por concepto de capital, más los intereses corrientes
                y moratorios causados hasta la fecha de diligenciamiento.
              </li>
              <li>
                <strong>Fecha de vencimiento:</strong> Será la fecha en que el acreedor o tenedor legítimo
                haga efectiva la exigibilidad de la obligación por haberse configurado la causal de mora.
              </li>
              <li>
                <strong>Eventos que habilitan el diligenciamiento:</strong> {data.eventoExigibilidad}
              </li>
              <li>
                <strong>Instrucciones específicas:</strong> {data.instruccionesLlenado}
              </li>
            </ol>
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};
