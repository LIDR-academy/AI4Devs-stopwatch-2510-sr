# ⏱️ Cronómetro y Cuenta Atrás Online

Aplicación web moderna de cronómetro y cuenta atrás desarrollada con tecnologías web estándar (HTML5, CSS3, JavaScript ES6+). Diseño minimalista, interfaz intuitiva y funcionalidad completa sin dependencias externas.

## 🎯 Características Principales

### Modo Cronómetro (Stopwatch)
- ⏱️ Cuenta ascendente desde 00:00:00:000
- 🎯 Precisión de milisegundos
- ▶️ Funciones Start/Pause/Clear
- 💾 Persistencia del estado con localStorage

### Modo Cuenta Atrás (Countdown)
- ⏳ Cuenta regresiva configurable
- ⚙️ Configuración de horas, minutos y segundos
- 🔔 Notificación al completarse
- 🎵 Sonido de alerta al finalizar
- ⚠️ Indicador visual cuando quedan menos de 10 segundos

### Funcionalidades Adicionales
- ⌨️ Atajos de teclado completos
- 📱 Diseño 100% responsive
- 🎨 Interfaz moderna con animaciones suaves
- 🌐 Compatible con todos los navegadores modernos
- ♿ Accesibilidad mejorada con ARIA labels
- 💻 Sin dependencias externas - vanilla JavaScript puro

## 📂 Estructura del Proyecto

```
ai4devs-stopwatch/
├── res/                      # Recursos (imágenes, iconos, futuros assets)
├── template/                 # Archivos principales de la aplicación
│   ├── index.html           # Estructura HTML semántica
│   ├── styles.css           # Estilos CSS3 con variables y animaciones
│   └── script.js            # Lógica JavaScript con arquitectura de clases
├── .gitignore               # Archivos excluidos del control de versiones
├── package-lock.json        # Lock file de dependencias (placeholder)
├── prompts.md               # Documentación de prompts utilizados
└── README.md                # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
1. Descarga o clona el repositorio
2. Abre el archivo `template/index.html` en tu navegador web
3. ¡Listo! La aplicación funcionará sin necesidad de servidor

### Opción 2: Con Servidor Local (Recomendado)
```bash
# Con Python 3
cd ai4devs-stopwatch/template
python -m http.server 8000

# Con Node.js (usando npx)
cd ai4devs-stopwatch/template
npx http-server -p 8000

# Con PHP
cd ai4devs-stopwatch/template
php -S localhost:8000
```

Luego abre tu navegador en: `http://localhost:8000`

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `Espacio` | Iniciar/Pausar el temporizador |
| `R` | Reiniciar el temporizador |
| `C` | Limpiar el temporizador |
| `M` | Cambiar entre modo Cronómetro y Cuenta Atrás |

## 🎨 Diseño y Colores

La aplicación utiliza una paleta de colores moderna y accesible:

- **Fondo principal**: Gradiente púrpura (#667eea → #764ba2)
- **Display**: Fondo claro (#f0f3f8) con borde oscuro (#2d3748)
- **Botón Start**: Verde vibrante (#48bb78)
- **Botón Clear**: Rojo claro (#f56565)
- **Botón Pause**: Naranja (#ed8936)

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge (versión 90+)
- ✅ Firefox (versión 88+)
- ✅ Safari (versión 14+)
- ✅ Opera (versión 76+)

### Dispositivos
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iPad, Android)
- ✅ Móviles (iPhone, Android)

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica con accesibilidad
- **CSS3**: Variables CSS, Flexbox, Grid, animaciones
- **JavaScript ES6+**: Clases, arrow functions, template literals
- **Web APIs**:
  - LocalStorage API (persistencia)
  - Notifications API (alertas)
  - Web Audio API (sonidos)
  - Page Visibility API (manejo de pestañas)

## 📋 Funcionalidades Técnicas

### Arquitectura del Código
- **Patrón de diseño**: Programación Orientada a Objetos
- **Clase principal**: `TimerApp` gestiona todo el estado y lógica
- **Separación de responsabilidades**: HTML (estructura), CSS (presentación), JS (lógica)
- **Comentarios extensos**: Código autodocumentado con explicaciones detalladas

### Gestión del Estado
- Estado del temporizador: stopped, running, paused
- Persistencia con localStorage
- Sincronización entre UI y lógica de negocio

### Precisión del Tiempo
- Intervalo de actualización: 10ms (alta precisión)
- Corrección de drift temporal
- Display de milisegundos en tiempo real

## 🎯 Casos de Uso

### Para Desarrolladores
- 🏃‍♂️ Cronometrar sprints de desarrollo
- 🧪 Medir tiempos de ejecución de tests
- ⏱️ Pomodoro técnico para productividad

### Para Usuarios Generales
- 🍳 Cocinar con temporizador preciso
- 💪 Entrenamientos y ejercicios
- 📚 Sesiones de estudio con Pomodoro
- 🧘 Meditación y respiración

## 🔐 Privacidad y Seguridad

- ✅ **Sin tracking**: No se recopila ningún dato del usuario
- ✅ **Sin conexión a internet necesaria**: Funciona 100% offline
- ✅ **Sin cookies de terceros**: Solo localStorage local
- ✅ **Código abierto**: Todo el código es auditable

## 🐛 Depuración y Desarrollo

### Consola del Navegador
La aplicación incluye logs detallados en la consola para depuración:
```javascript
// Abre la consola de desarrollador (F12)
// Verás mensajes como:
// 🚀 Inicializando aplicación de cronómetro...
// ✅ Aplicación inicializada correctamente
// ▶️ Temporizador iniciado
```

### Mensajes de Estado
- `▶️` Temporizador iniciado
- `⏸️` Temporizador pausado
- `🔄` Temporizador limpiado
- `✅` Cuenta atrás completada

## 🚧 Mejoras Futuras

### Versión 1.1
- [ ] Modo de vueltas (lap times) para el cronómetro
- [ ] Historial de tiempos registrados
- [ ] Exportar datos a CSV
- [ ] Temas personalizables (claro/oscuro)

### Versión 1.2
- [ ] Múltiples temporizadores simultáneos
- [ ] Temporizadores guardados con nombres
- [ ] Sincronización entre dispositivos
- [ ] Aplicación PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**AI4Devs**
- Proyecto creado con fines educativos y demostrativos
- Desarrollado utilizando Claude Opus 4.1 de Anthropic

## 🙏 Agradecimientos

- Inspirado en [online-stopwatch.com](https://www.online-stopwatch.com/)
- Diseño minimalista basado en principios de UX moderna
- Gracias a la comunidad de desarrolladores web por sus contribuciones al conocimiento abierto

## 📞 Soporte y Contacto

Si encuentras algún bug o tienes sugerencias de mejora:
1. Revisa los issues existentes
2. Crea un nuevo issue describiendo el problema
3. Proporciona detalles del navegador y sistema operativo

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

*Última actualización: Noviembre 2024*
