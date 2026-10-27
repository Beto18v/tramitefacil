/**
 * Utility to convert numbers into formal legal Spanish words
 * e.g., 1500000 -> "UN MILLÓN QUINIENTOS MIL PESOS M/CTE."
 */

const UNIDADES = [
  '',
  'UN',
  'DOS',
  'TRES',
  'CUATRO',
  'CINCO',
  'SEIS',
  'SIETE',
  'OCHO',
  'NUEVE',
  'DIEZ',
  'ONCE',
  'DOCE',
  'TRECE',
  'CATORCE',
  'QUINCE',
  'DIECISÉIS',
  'DIECISIETE',
  'DIECIOCHO',
  'DIECINUEVE',
  'VEINTE',
  'VEINTIÚN',
  'VEINTIDÓS',
  'VEINTITRÉS',
  'VEINTICUATRO',
  'VEINTICINCO',
  'VEINTISÉIS',
  'VEINTISIETE',
  'VEINTIOCHO',
  'VEINTINUEVE',
];

const DECENAS = [
  '',
  'DIEZ',
  'VEINTE',
  'TREINTA',
  'CUARENTA',
  'CINCUENTA',
  'SESENTA',
  'SETENTA',
  'OCHENTA',
  'NOVENTA',
];

const CENTENAS = [
  '',
  'CIENTO',
  'DOSCIENTOS',
  'TRESCIENTOS',
  'CUATROCIENTOS',
  'QUINIENTOS',
  'SEISCIENTOS',
  'SETECIENTOS',
  'OCHOCIENTOS',
  'NOVECIENTOS',
];

function leerCentenas(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'CIEN';
  if (n < 30) return UNIDADES[n];
  if (n < 100) {
    const dec = Math.floor(n / 10);
    const uni = n % 10;
    return uni === 0 ? DECENAS[dec] : `${DECENAS[dec]} Y ${UNIDADES[uni]}`;
  }
  const cen = Math.floor(n / 100);
  const resto = n % 100;
  if (resto === 0) return CENTENAS[cen];
  return `${CENTENAS[cen]} ${leerCentenas(resto)}`;
}

function leerMiles(n: number): string {
  if (n === 0) return '';
  if (n < 1000) return leerCentenas(n);
  const miles = Math.floor(n / 1000);
  const resto = n % 1000;
  const milesTexto = miles === 1 ? 'MIL' : `${leerCentenas(miles)} MIL`;
  if (resto === 0) return milesTexto;
  return `${milesTexto} ${leerCentenas(resto)}`;
}

export function numeroALetras(
  valor: number,
  moneda: string = 'PESOS M/CTE.'
): string {
  if (isNaN(valor) || valor <= 0) {
    return `CERO ${moneda}`;
  }

  const entero = Math.floor(valor);
  const centavos = Math.round((valor - entero) * 100);

  let textoEntero = '';

  if (entero === 0) {
    textoEntero = 'CERO';
  } else if (entero < 1000000) {
    textoEntero = leerMiles(entero);
  } else if (entero < 1000000000000) {
    const millones = Math.floor(entero / 1000000);
    const resto = entero % 1000000;
    const millonesTexto =
      millones === 1 ? 'UN MILLÓN' : `${leerMiles(millones)} MILLONES`;
    if (resto === 0) {
      textoEntero = `${millonesTexto} DE`;
    } else {
      textoEntero = `${millonesTexto} ${leerMiles(resto)}`;
    }
  } else {
    return `${valor.toLocaleString('es-CO')} ${moneda}`;
  }

  textoEntero = textoEntero.replace(/\s+/g, ' ').trim();

  const textoCentavos =
    centavos > 0
      ? ` CON ${centavos.toString().padStart(2, '0')}/100`
      : '';

  return `${textoEntero} ${moneda}${textoCentavos}`.toUpperCase();
}

export function formatearMoneda(valor: number, prefijo: string = '$'): string {
  if (isNaN(valor)) return `${prefijo} 0`;
  return `${prefijo} ${valor.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function calcularTotalesCuentaCobro(
  subtotal: number,
  aplicaRete: boolean,
  pctRete: number,
  aplicaICA: boolean,
  pctICA: number
) {
  const safeSubtotal = Math.max(0, subtotal || 0);
  const reteFuente = aplicaRete ? Math.round((safeSubtotal * (pctRete || 0)) / 100) : 0;
  const reteICA = aplicaICA ? Math.round((safeSubtotal * (pctICA || 0)) / 100) : 0;
  const totalNeto = Math.max(0, safeSubtotal - reteFuente - reteICA);

  return {
    subtotal: safeSubtotal,
    reteFuente,
    reteICA,
    totalNeto,
  };
}

export function calcularSubtotalConceptos(items?: Array<{ cantidad: number; valorUnitario: number }>): number {
  if (!items || items.length === 0) return 0;
  return items.reduce((acc, item) => acc + (Math.max(0, item.cantidad || 0) * Math.max(0, item.valorUnitario || 0)), 0);
}

