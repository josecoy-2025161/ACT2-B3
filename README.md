===============================================================================
  ACTIVIDAD 2 - CÁLCULO DE IVA, SUBTOTAL Y TOTAL CON TYPESCRIPT
===============================================================================

Aplicación de consola que calcula el SUBTOTAL, el IVA y el TOTAL de una compra
a partir de una lista de montos. Incluye un menú interactivo que se repite en
bucle hasta que el usuario decide salir.

La tasa de IVA por defecto es 12% (Guatemala), pero puede cambiarse desde el
menú durante la ejecución.


-------------------------------------------------------------------------------
  1. ESTRUCTURA DEL PROYECTO
-------------------------------------------------------------------------------

```
proyecto-iva/
├── src/
│   ├── data/
│   │   └── IvaData.ts       # Datos de ejemplo y ejecución de pruebas
│   ├── service/
│   │   └── IvaService.ts    # Funciones de cálculo (subtotal, IVA, total)
│   └── index.ts             # Punto de entrada: menú en bucle
├── .gitignore
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

El código se dividió en archivos separados según su responsabilidad:

  - service/IvaService.ts
      Módulo central de la lógica. Contiene únicamente las tres funciones de
      cálculo y no depende de ningún otro archivo.

  - data/IvaData.ts
      Importa las funciones del servicio y las ejecuta con datos de ejemplo
      para verificar que los resultados sean correctos.

  - index.ts
      Punto de entrada. Muestra el menú, lee lo que escribe la persona usuaria
      y llama a las funciones según la opción elegida.

Esta separación cumple el principio de RESPONSABILIDAD ÚNICA: si hay que
corregir un cálculo se edita solo IvaService.ts; si se quiere cambiar el menú
solo se toca index.ts.


-------------------------------------------------------------------------------
  2. DISEÑO DE LAS FUNCIONES
-------------------------------------------------------------------------------

Las tres funciones viven en src/service/IvaService.ts. Cada una tiene una sola
responsabilidad:

  calcularSubtotal(montos)
      Propósito : Suma todos los montos de una lista para obtener el subtotal
                  (monto sin impuesto).
      Parámetro : montos: number[]  -> lista de precios o montos base.
      Retorna   : number            -> la suma de todos los montos.

  calcularIva(subtotal, tasaIva)
      Propósito : Obtiene el valor del IVA a partir del subtotal y una tasa
                  de impuesto.
      Parámetros: subtotal: number  -> monto base sobre el que se aplica.
                  tasaIva:  number  -> porcentaje de IVA (12 por defecto).
      Retorna   : number            -> el valor del IVA.

  calcularTotal(subtotal, iva)
      Propósito : Combina el subtotal y el IVA para obtener el total final.
      Parámetros: subtotal: number  -> monto base de la compra.
                  iva:      number  -> valor del impuesto ya calculado.
      Retorna   : number            -> el total a pagar (subtotal + IVA).

Nota: calcularIva usa un parámetro por defecto (tasaIva = 12), por lo que puede
llamarse con o sin la tasa.


-------------------------------------------------------------------------------
  3. PRUEBAS REALIZADAS Y RESULTADOS
-------------------------------------------------------------------------------

La opción 3 del menú (archivo data/IvaData.ts) ejecuta varios casos de ejemplo
que simulan compras reales. Los resultados coinciden con los cálculos esperados
usando una tasa del 12%:

  PRUEBA   MONTOS                 SUBTOTAL    IVA (12%)    TOTAL
  ------   --------------------   ---------   ----------   ---------
    1      100, 50, 25            Q175.00      Q21.00      Q196.00
    2      299.99                 Q299.99      Q36.00      Q335.99
    3      10, 20, 30, 40, 50     Q150.00      Q18.00      Q168.00

Verificación manual de la Prueba 1:

  Subtotal = 100 + 50 + 25      = 175.00
  IVA      = 175 * (12 / 100)   =  21.00
  Total    = 175 + 21           = 196.00

El resultado del programa coincide con el cálculo hecho a mano, lo que confirma
que las funciones operan correctamente.


-------------------------------------------------------------------------------
  4. CÓMO EJECUTAR EL PROYECTO
-------------------------------------------------------------------------------

Desde la carpeta del proyecto, en la terminal:

  pnpm install
  pnpm start

  - pnpm install : baja las dependencias (incluido prompt-sync, que permite
                   leer datos del teclado).
  - pnpm start   : abre el menú interactivo en la consola.

Si en package.json no existe el script "start", agrégalo dentro de "scripts":

  "start": "ts-node src/index.ts"

Opciones del menú:

  1. Calcular una compra         -> pide los montos separados por comas
  2. Cambiar la tasa de IVA      -> permite usar un porcentaje distinto al 12%
  3. Ejecutar pruebas de ejemplo -> corre los casos de prueba
  4. Salir                       -> termina el programa


-------------------------------------------------------------------------------
  5. CONCLUSIONES
-------------------------------------------------------------------------------

  - Dividir la lógica en funciones pequeñas, cada una con una sola
    responsabilidad, hizo el código más claro y fácil de probar.

  - Separar el proyecto en módulos (service, data e index) facilita el
    mantenimiento: cada cambio se localiza en un solo archivo.

  - Las pruebas con datos de ejemplo confirmaron que el subtotal, el IVA y el
    total se calculan de forma coherente y correcta.

  - El menú en bucle permite calcular varias compras en una misma sesión sin
    tener que volver a iniciar el programa.

===============================================================================