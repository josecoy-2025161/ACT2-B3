/**
 * Módulo de cálculos (servicio).
 * Contiene la lógica de negocio para calcular subtotal, IVA y total.
 */

/**
 * Calcula el subtotal sumando todos los montos de una lista.
 * @param montos - Lista de precios o montos base (sin impuesto).
 * @returns La suma de todos los montos (subtotal).
 */
export function calcularSubtotal(montos: number[]): number {
  let subtotal = 0;
  for (const monto of montos) {
    subtotal += monto;
  }
  return subtotal;
}

/**
 * Calcula el valor del IVA a partir del subtotal y una tasa de impuesto.
 * @param subtotal - Monto base sobre el cual se aplica el impuesto.
 * @param tasaIva - Tasa de IVA en porcentaje (12 por defecto, como en Guatemala).
 * @returns El valor del IVA correspondiente.
 */
export function calcularIva(subtotal: number, tasaIva: number = 12): number {
  return subtotal * (tasaIva / 100);
}

/**
 * Calcula el total final sumando el subtotal y el IVA.
 * @param subtotal - Monto base de la compra.
 * @param iva - Valor del impuesto ya calculado.
 * @returns El total a pagar (subtotal + IVA).
 */
export function calcularTotal(subtotal: number, iva: number): number {
  return subtotal + iva;
}