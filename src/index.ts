/**
 * Módulo principal.
 * Muestra un menú en bucle y usa las funciones de cálculo según la opción
 * que elija el usuario.
 */

import promptSync from "prompt-sync";
import { calcularSubtotal, calcularIva, calcularTotal } from "./service/IvaService";
import { ejecutarPruebas } from "./data/IvaData";

// Crea la función para leer datos del teclado.
const prompt = promptSync();

// Tasa de IVA por defecto (Guatemala = 12%). Se puede cambiar desde el menú.
let tasaIva = 12;

/**
 * Muestra el menú de opciones en la consola.
 */
function mostrarMenu(): void {
  console.log("\n==================================================");
  console.log("       SISTEMA DE CÁLCULO DE VENTAS (IVA)");
  console.log("==================================================");
  console.log(`Tasa de IVA actual: ${tasaIva}%`);
  console.log("--------------------------------------------------");
  console.log("1. Calcular una compra");
  console.log("2. Cambiar la tasa de IVA");
  console.log("3. Ejecutar pruebas de ejemplo");
  console.log("4. Salir");
  console.log("==================================================");
}

/**
 * Pide los montos a la persona usuaria, calcula y muestra el resultado.
 */
function calcularCompra(): void {
  const entrada = prompt(
    "Ingresa los montos separados por comas (ej: 100, 50, 25): "
  );

  // Convierte el texto en una lista de números válidos.
  const montos = entrada
    .split(",")
    .map((valor) => Number(valor.trim()))
    .filter((valor) => !isNaN(valor) && valor >= 0);

  if (montos.length === 0) {
    console.log(">> No ingresaste montos válidos. Intenta de nuevo.");
    return;
  }

  const subtotal = calcularSubtotal(montos);
  const iva = calcularIva(subtotal, tasaIva);
  const total = calcularTotal(subtotal, iva);

  console.log("\n--- RESULTADO DE LA COMPRA ---");
  console.log(`Montos:        ${montos.join(", ")}`);
  console.log(`Subtotal:      Q${subtotal.toFixed(2)}`);
  console.log(`IVA (${tasaIva}%):     Q${iva.toFixed(2)}`);
  console.log(`TOTAL:         Q${total.toFixed(2)}`);
}

/**
 * Permite cambiar la tasa de IVA usada en los cálculos.
 */
function cambiarTasa(): void {
  const nueva = Number(prompt("Ingresa la nueva tasa de IVA (%): "));

  if (isNaN(nueva) || nueva < 0) {
    console.log(">> Tasa no válida. Se mantiene la anterior.");
    return;
  }

  tasaIva = nueva;
  console.log(`>> Tasa de IVA actualizada a ${tasaIva}%.`);
}

// Ejecuta el menú en bucle hasta que la persona usuaria elige salir.

let salir = false;

while (!salir) {
  mostrarMenu();
  const opcion = prompt("Elige una opción: ");

  switch (opcion) {
    case "1":
      calcularCompra();
      break;
    case "2":
      cambiarTasa();
      break;
    case "3":
      ejecutarPruebas();
      break;
    case "4":
      salir = true;
      console.log("\n¡Gracias por usar el sistema! Hasta luego.");
      break;
    default:
      console.log(">> Opción no válida. Elige una opción del 1 al 4.");
  }
}