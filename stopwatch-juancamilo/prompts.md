# Prompt: Desarrollo de App "Stop Watch" (HTML/CSS/JS)

**Rol:** Eres un Desarrollador Frontend Senior experto en arquitectura limpia, JavaScript moderno y replicación de interfaces de usuario (Pixel Perfect).

**Objetivo:**
Actualizar un archivo HTML base para crear una aplicación web de "Stop Watch" (Cronómetro) funcional. El proyecto debe constar de **tres archivos separados** (`index.html`, `styles.css`, `script.js`) y replicar un diseño visual específico.

---

## 1. HTML (`index.html`)

**Instrucción:**
Utiliza el siguiente código base. **No elimines** las etiquetas existentes (como el `<h1>` o los metadatos), solo agrega la nueva estructura necesaria dentro del `<body>`:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer and Countdown</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Timer and Countdown</h1>
    
    <script src="script.js"></script>
</body>
</html>
```

# Requerimientos del DOM

## 1. Contenedor principal
- Crear un contenedor principal con la clase `.stopwatch-container` **debajo del `<h1>`**.

## 2. Display del Tiempo
- Debe mostrar:
    - Horas
    - Minutos
    - Segundos
    - Milisegundos

### Estructura Crítica
- Los números principales (HH:MM:SS) deben estar **visualmente diferenciados**.
- Los milisegundos deben ir en un `<span>` separado con clase `.milliseconds` para permitir un estilo y posicionamiento independiente.
  ```html
  <span class="milliseconds">000</span>


# 2. Archivo CSS (styles.css)

**Instrucción:**  
Crea un archivo de estilos separado. El diseño debe replicar una estética vectorial limpia y moderna, tipo "cartoon" plano pero con bordes definidos.

---

## Layout General

- Usa **Flexbox** para centrar todo el contenido en la pantalla.
- Disposición en **columna**:  
  `Título > Display > Botones`
- **Fuente tipográfica**: Sans-serif legible (`Arial`, `Helvetica`, `Roboto`)
    - `font-variant-numeric: tabular-nums;` para evitar saltos visuales al cambiar los números.

---

## Componente Display (El Reloj)

**Forma:**
- Contenedor rectangular con **bordes extremadamente redondeados** (estilo "píldora"):  
  `border-radius: 50px;`

**Estilos:**

- **Fondo:** Color lavanda muy pálido `#E6E6FA`
- **Borde:** Grueso (4px-5px) y sólido, color gris muy oscuro o negro `#222`

**Tipografía:**

- **Números principales (00:00:00):**
    - Tamaño muy grande (`4rem - 6rem`)
    - Color: negro
- **Milisegundos (000):**
    - Tamaño mucho más pequeño (aprox. 1/4 del tamaño principal)
    - Posicionamiento: esquina inferior derecha del bloque de texto principal, alineados con la línea base de los números grandes

---

## Componente Botones

**Posición:**
- Debajo del reloj con una separación vertical considerable (`gap: 20px - 30px`)

**Estilo Base:**

- `padding` generoso
- Bordes redondeados (`10px - 15px`)
- Borde oscuro `#222` del mismo grosor que el reloj

**Colores específicos:**

- **Botón "Start":**
    - Fondo verde lima vibrante `#5CD648`
    - Aplicar **degradado lineal sutil** (más claro arriba) para efecto 3D simple
- **Botón "Clear":**
    - Fondo rojo anaranjado vibrante `#EE3B2F`
    - Aplicar mismo degradado sutil

**Estados:**

- `cursor: pointer`
- Efecto visual `active` (hundirse ligeramente o cambiar sombra) al hacer clic

# 3. Archivo JavaScript (script.js)

**Instrucción:**  
Crea un archivo separado con **lógica pura (Vanilla JS)** para manipular el DOM.

---

## Funcionalidad Requerida

### Variables de Estado
- Gestiona:
    - `horas`
    - `minutos`
    - `segundos`
    - `milisegundos`

---

### Botón "Start"
- Inicia un intervalo (`setInterval`) que **actualiza el tiempo cada 10ms**
- **Validación de seguridad:**
    - Verifica si el cronómetro ya está corriendo
    - Evita que presionar "Start" múltiples veces cree intervalos superpuestos

---

### Botón "Clear"
- Detiene el intervalo actual (`clearInterval`)
- Resetea todas las variables lógicas a `0`
- Actualiza el display a:
    - `00:00:00` y milisegundos `000`

---

### Formateo de Texto
- Usa funciones auxiliares para asegurar que:
    - **Horas, minutos y segundos:** siempre tengan **2 dígitos** (ej: `09` en lugar de `9`)
    - **Milisegundos:** siempre tengan **3 dígitos** (ej: `045` en lugar de `45`)

---

## Restricciones Finales
- Código limpio, comentado y semántico
- **No usar frameworks** (Bootstrap, Tailwind, React, etc.)
    - Solo **estándares web nativos**
- Diseño responsivo básico (no debe romperse en pantallas pequeñas)
