# Cronómetro & Cuenta Atrás (HTML + JS puro)

Aplicación web sencilla que permite elegir entre **cronómetro** y **cuenta atrás**. Está pensada como ejercicio de prácticas para trabajar con:

- HTML y JavaScript puro (sin frameworks)
- Separación de lógica (`script.js`) y vista (`index.html`)
- Estilos rápidos con **TailwindCSS vía CDN**
- Buenas prácticas básicas (nombres claros, modularidad sencilla, comentarios)
- Tests muy simples con `console.assert()`

---

## 🗂 Estructura del proyecto

```text
.
├── index.html      # Página principal + todas las vistas (home / crono / cuenta atrás)
├── script.js       # Lógica de navegación, cronómetro y cuenta atrás + tests
└── README.md       # Este archivo de documentación
```

No se requieren dependencias externas ni build.

---

## 🚀 Cómo usar

1. Descarga (o clona) el proyecto.
2. Abre `index.html` en tu navegador.
3. En la pantalla principal elige:
   - **Cronómetro** → cuenta hacia arriba desde 00:00:00.
   - **Cuenta atrás** → introduces un tiempo con un teclado numérico y después cuentas hacia atrás.
4. Puedes volver atrás siempre que quieras con el botón “Volver atrás”.

> **Importante:** el proyecto usa Tailwind vía CDN, así que necesitas conexión a internet para ver los estilos.

---

## 🧠 Lógica de funcionamiento

### 1. Navegación entre vistas
La app tiene **una sola página** con tres secciones (`home`, `stopwatch`, `countdown`). JavaScript oculta/muestra cada sección según lo que el usuario seleccione. Esto mejora la experiencia y evita recargas completas.

### 2. Cronómetro
- Inicialmente muestra `00:00:00` y milisegundos `000`.
- Botón **Iniciar** → comienza a contar hacia arriba usando `requestAnimationFrame` para mayor precisión.
- Durante la marcha, el botón cambia a **Pausar**.
- Botón **Reiniciar** → vuelve a cero y el botón principal vuelve a ser **Iniciar**.
- Límite lógico: `99:99:99` (se capan las horas, minutos y segundos).
- Se muestran también los milisegundos.

### 3. Cuenta atrás
- Primero aparece un **teclado numérico** (similar al de la referencia) donde el usuario puede introducir hasta 6 dígitos que representan `HHMMSS`.
  - Ejemplo: `000045` → 45 segundos.
  - Ejemplo: `010000` → 1 hora exacta.
- Botón **Asignar** → ese tiempo queda guardado como valor inicial y se oculta el teclado. Aparecen los botones **Iniciar** y **Reiniciar**.
- Botón **Iniciar** → empieza a descontar hacia atrás con `requestAnimationFrame`.
- Botón **Pausar** → detiene la cuenta atrás.
- Botón **Reiniciar** → vuelve al valor inicial que se asignó con el teclado.
- Cuando llega a 0 dispara un `alert("⏰ Tiempo finalizado")`.
- También aquí se muestran milisegundos.

### 4. Tests básicos
Al cargarse el script se ejecuta `runTests()` que hace varias comprobaciones mínimas con `console.assert()` sobre las funciones puras:
- `formatTime(...)`
- `digitsToMs(...)`

Puedes ver los resultados en la consola del navegador (F12 → Consola).

---

## 📦 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari).
- Conexión a internet para cargar Tailwind.
- No requiere servidor: basta con hacer doble clic en `index.html`.

---

## 🧪 Ejemplo de entrada/salida

**Entrada:** el usuario pulsa en “Cuenta atrás”, introduce `000090` (90 segundos) y pulsa “Asignar”.  
**Salida:** se oculta el teclado, se muestra el tiempo `00:01:30` y al pulsar **Iniciar** comienza a bajar hasta 0. Al llegar a 0, se muestra un aviso.

---

## 🔧 Posibles mejoras futuras

- Sonido o animación al terminar la cuenta atrás.
- Permitir edición del tiempo sin volver a la pantalla inicial.
- Guardar en LocalStorage el último tiempo usado.
- Añadir laps/vueltas al cronómetro.
- Internacionalización de textos.
- Tests más formales con una librería de testing.

---

## ✍️ Autor

Generado automáticamente como ejemplo por ChatGPT a partir de requisitos proporcionados por el usuario.
