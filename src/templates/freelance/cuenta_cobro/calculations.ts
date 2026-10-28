import { ConceptoItem } from '../../../types/documents';

export interface TotalesCuentaCobro {
  subtotal: number;
  reteFuente: number;
  reteICA: number;
  totalNeto: number;
}

export function calcularSubtotalConceptos(conceptos: ConceptoItem[]): number {
  if (!conceptos || conceptos.length === 0) return 0;
  return conceptos.reduce((acc, item) => {
    const cant = typeof item.cantidad === 'number' ? item.cantidad : 1;
    const val = typeof item.valorUnitario === 'number' ? item.valorUnitario : 0;
    return acc + cant * val;
  }, 0);
}

export function calcularTotalesCuentaCobro(
  subtotal: number,
  aplicaReteFuente: boolean,
  porcentajeReteFuente: number,
  aplicaReteICA: boolean,
  porcentajeReteICA: number
): TotalesCuentaCobro {
  const safeSubtotal = Math.max(0, subtotal || 0);

  const reteFuente = aplicaReteFuente
    ? Math.round(safeSubtotal * ((porcentajeReteFuente || 0) / 100))
    : 0;

  const reteICA = aplicaReteICA
    ? Math.round(safeSubtotal * ((porcentajeReteICA || 0) / 100))
    : 0;

  const totalNeto = Math.max(0, safeSubtotal - reteFuente - reteICA);

  return {
    subtotal: safeSubtotal,
    reteFuente,
    reteICA,
    totalNeto,
  };
}

