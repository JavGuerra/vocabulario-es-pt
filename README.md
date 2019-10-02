# vocabulario-es-pt
Herramienta web para aprender vocabulario

Muestra palabras y frases al azar y pide que introduzcas su traducción correcta. Esta versión permite la traducción del español al portugués y viceversa.

Consta de un pequeño diccionario de ejemplo, que puede ser ampliado siguiendo las indicaciones del fichero "diccionario.js".

[Acceder a la herramienta en línea](https://javguerra.github.io/vocabulario-es-pt/)


**Usar la herramienta para otros idiomas**

Es posible emplear esta herramienta para realizar ejercicios de traducción de otros idiomas, aunque la interfaz básica del HTML (el texto que se muestra si no funciona javascript) esté en español.

Para su uso con otros idiomas deberá editar dos ficheros:
- diccionario.js que contiene los pares de textos para los ejercicios de traducción
- js/idioma.js que contiene los textos relacionados con la interfaz

**Versiones**

- 2019-08-03 v.0.1 javguerra
- 2019-09-07 v.0.2 javguerra
    - Realizados cambios para poder usar la herramienta con otros idiomas. Ver fichero idioma.js
    - Ahora realiza la comprobación de la respuesta sin tener en cuenta myúsculas y minúsculas.
- 2019-10-02 v.0.3 javguerra
    - Cambios estéticos. Centrado de ventana de introducción de datos