/**
 * Módulo de pruebas.
 * Ejecuta las funciones de cálculo con datos de ejemplo para verificar
 * que los resultados sean coherentes.
 */

import { calcularSubtotal, calcularIva, calcularTotal } from "../service/IvaService";

/**
 * Ejecuta una serie de pruebas con compras de ejemplo y muestra los resultados.
 * @returns No devuelve nada; imprime los resultados en la consola.
 */
export function ejecutarPruebas(): void {
  console.log("\n========== PRUEBAS CON DATOS DE EJEMPLO ==========");

  const compras: number[][] = [
    [100, 50, 25],
    [299.99],
    [10, 20, 30, 40, 50],
  ];

  let numero = 1;
  for (const compra of compras) {
    const subtotal = calcularSubtotal(compra);
    const iva = calcularIva(subtotal); // usa 12% por defecto
    const total = calcularTotal(subtotal, iva);

    console.log(`\nPrueba ${numero}`);
    console.log(`  Montos:   ${compra.join(", ")}`);
    console.log(`  Subtotal: Q${subtotal.toFixed(2)}`);
    console.log(`  IVA(12%): Q${iva.toFixed(2)}`);
    console.log(`  Total:    Q${total.toFixed(2)}`);
    numero++;
  }

  console.log("\n==================================================");
}