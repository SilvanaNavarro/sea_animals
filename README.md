# Mundo Marino - Animales Marinos Interactivos

Una página web interactiva que presenta información sobre diversos animales marinos con imágenes y datos curiosos.

## Descripción del Proyecto

Este proyecto es una aplicación web que permite a los usuarios explorar diferentes animales marinos a través de una interfaz interactiva. Cada animal tiene una imagen asociada y una lista de datos curiosos que se muestran cuando el usuario hace clic en él.

## Características

- **Exploración de Animales**: Haz clic en cualquier animal para ver sus datos curiosos
- **Animales Marinos**: Incluye tiburones, delfines, pulpos, medusas, y más
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Animaciones Suaves**: Efectos visuales agradables con CSS
- **Fondo Oceánico Animado**: Simula el fondo marino con burbujas y efectos de olas

## Estructura del Proyecto

```
sea_animals/
├── index.html          # Página principal HTML
├── style.css           # Estilos CSS con animaciones
├── script.js           # Lógica JavaScript para interactividad
├── animales.json       # Datos de los animales marinos
└── README.md           # Este archivo de documentación
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página
- **CSS3**: Estilos y animaciones con gradientes y keyframes
- **JavaScript (ES6+)**: Lógica de interactividad y manejo de datos
- **JSON**: Formato de datos para los animales

## Cómo Agregar Nuevos Animales

Para agregar un nuevo animal a la colección, sigue estos pasos:

### 1. Agrega los datos del animal en `animales.json`

Abre el archivo `animales.json` y agrega un nuevo objeto con la siguiente estructura:

```json
{
  "name": "Nombre del Animal",
  "facts": [
    "Dato curioso 1",
    "Dato curioso 2",
    "Dato curioso 3",
    "Dato curioso 4",
    "Dato curioso 5",
    "Dato curioso 6",
    "Dato curioso 7"
  ],
  "imageUrl": "URL_de_la_imagen.jpg"
}
```

### 2. Agrega el HTML del nuevo animal

En `index.html`, dentro del contenedor `.animals-grid`, agrega un nuevo elemento div con la clase `animal-card`:

```html
<div class="animal-card" onclick="showAnimalInfo('Nombre del Animal')">
  <img src="URL_de_la_imagen.jpg" alt="Nombre del Animal">
  <h3>Nombre del Animal</h3>
</div>
```

### 3. Actualiza la función `showAnimalInfo` en `script.js`

Asegúrate de que la función `showAnimalInfo` en `script.js` pueda manejar el nuevo animal. La función busca automáticamente los datos en el objeto `seaCreaturesData`.

### 4. Agrega estilos CSS (si es necesario)

Si el nuevo animal requiere estilos especiales, puedes agregarlos en `style.css`.

## Formato de las Imágenes

- **Formato recomendado**: JPG o PNG
- **Tamaño ideal**: 300x300px o similar
- **Formato responsivo**: Las imágenes se escalan automáticamente
- **URL**: Puede ser una URL externa o una ruta local

## Ejemplo de Nuevo Animal

Aquí tienes un ejemplo de cómo agregar una "Orca":

1. En `animales.json`:
```json
{
  "name": "Orca",
  "facts": [
    "Es el depredador más grande del océano",
    "Puede nadar a 56 km/h",
    "Vive en grupos llamados pods",
    "Caza focas, leones marinos y peces",
    "Tiene dientes de 10 cm de largo",
    "Puede sumergirse hasta 200 metros",
    "Vive hasta 90 años en libertad"
  ],
  "imageUrl": "https://ejemplo.com/orca.jpg"
}
```

2. En `index.html`:
```html
<div class="animal-card" onclick="showAnimalInfo('Orca')">
  <img src="https://ejemplo.com/orca.jpg" alt="Orca">
  <h3>Orca</h3>
</div>
```

## Cómo Ejecutar el Proyecto

1. **Método 1 (Local)**:
   - Abre el archivo `index.html` directamente en tu navegador web

2. **Método 2 (Servidor Local)**:
   - Usa un servidor local como Live Server (VS Code extension)
   - O ejecuta: `python -m http.server` en el directorio del proyecto
   - Abre `http://localhost:8000` en tu navegador

## Personalización

### Cambiar colores del tema
Modifica los colores en `style.css`:
- `.ocean-background`: Fondo oceánico
- `.animal-card`: Tarjetas de animales
- `.info-panel`: Panel de información

### Agregar más datos curiosos
Cada animal puede tener entre 3-7 datos curiosos. Simplemente agrega más elementos en el array `facts`.

## Contribuciones

Si deseas contribuir al proyecto:
1. Haz un fork del repositorio
2. Crea una rama para tu nueva funcionalidad
3. Agrega tus cambios
4. Abre un pull request

## Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo libremente para fines personales o comerciales.

---

**Nota**: Este proyecto es ideal para principiantes que quieren aprender HTML, CSS y JavaScript, y para quienes quieren crear una página web interactiva sobre temas de naturaleza y educación.