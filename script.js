// Datos base de los animales marinos (sin URLs)
const seaCreaturesData = [
    {
        name: "Tiburón Blanco",
        facts: [
            "Puede nadar a 56 km/h",
            "Tiene 300 dientes afilados",
            "Vive hasta 70 años",
            "Detecta sangre a 5 km",
            "Nace con 1 metro de largo",
            "Come focas y leones marinos",
            "Es depredador ápice",
            "Tiene 6 sentidos agudos",
            "Migra miles de kilómetros",
            "Pesa hasta 3 toneladas"
        ]
    },
    {
        name: "Delfín Nariz de Botella",
        facts: [
            "Usan ecolocalización",
            "Son muy inteligentes",
            "Viven en grupos familiares",
            "Comunican con silbidos",
            "Nacen con cola hacia arriba",
            "Duermen con un ojo abierto",
            "Ayudan a otros animales",
            "Pueden saltar 6 metros",
            "Viven hasta 50 años",
            "Nadan a 35 km/h"
        ]
    },
    {
        name: "Tortuga Marina",
        facts: [
            "Viven hasta 150 años",
            "Navegan usando campos magnéticos",
            "Regresan a su nacimiento",
            "Cuello se retrae dentro",
            "Pueden contener la respiración",
            "Comen medusas y algas",
            "Sus huevos son redondos",
            "Tienen patas como aletas",
            "Migran 10,000 km",
            "Son reptiles ancestrales"
        ]
    },
    {
        name: "Pulpo Azul",
        facts: [
            "Tiene 3 corazones",
            "Sangre azul por cobre",
            "Cambian de color",
            "Tienen 8 brazos",
            "Son muy inteligentes",
            "Pueden caminar",
            "Escapan fácilmente",
            "Viven 1-2 años",
            "Comen cangrejos",
            "Tienen 2 mil ventosas"
        ]
    },
    {
        name: "Manta Raya",
        facts: [
            "Pueden saltar 2 metros",
            "Comen plancton",
            "Viven hasta 50 años",
            "Tienen cerebro grande",
            "Son muy gentiles",
            "Nadan con gracia",
            "Tienen 1.5 metros de ancho",
            "Viven en aguas cálidas",
            "No tienen aguijón",
            "Pueden dar a luz crías"
        ]
    },
    {
        name: "Coral",
        facts: [
            "Son animales no plantas",
            "Viven en colonias",
            "Alimentan con plancton",
            "Producen oxígeno",
            "Hogar para peces",
            "Crecen muy lentamente",
            "Viven 5000 años",
            "Cambio climático los afecta",
            "Tienen simbiosis",
            "Forman arrecifes"
        ]
    },
    {
        name: "Ballena Jorobada",
        facts: [
            "Son los animales más grandes",
            "Cantan canciones complejas",
            "Saltan fuera del agua",
            "Viven 90 años",
            "Migran 25,000 km",
            "Comen krill",
            "Tienen bigotes filtrantes",
            "Nacen con 5 metros",
            "Pueden sumergirse 500m",
            "Son mamíferos"
        ]
    },
    {
        name: "Estrella de Mar",
        facts: [
            "Tienen 5 brazos",
            "Regeneran partes",
            "Comen mejillones",
            "Mueven agua con brazos",
            "Viven 35 años",
            "No tienen cerebro",
            "Tienen pies ambulacrales",
            "Caminan boca abajo",
            "Tienen ojos en puntas",
            "Sienten con tacto"
        ]
    }
];

let seaCreatures = [];
let currentCreatureIndex = 0;
let currentFactIndex = 0;

// Función para cargar URLs desde el archivo JSON
async function loadImageUrls() {
    try {
        const response = await fetch('animales.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const imageUrls = await response.json();
        
        // Combinar datos base con URLs de imágenes
        seaCreatures = seaCreaturesData.map(creature => ({
            ...creature,
            image: imageUrls[creature.name] || 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'
        }));
        
        console.log('URLs de imágenes cargadas correctamente');
        console.log('Animales cargados:', seaCreatures.map(c => c.name));
    } catch (error) {
        console.error('Error al cargar URLs de imágenes:', error);
        // Usar URLs por defecto si falla la carga
        seaCreatures = seaCreaturesData.map(creature => ({
            ...creature,
            image: 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'
        }));
    }
}

// Función para obtener un número aleatorio
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener un dato curioso aleatorio
function getRandomFact(creature) {
    const randomIndex = getRandomNumber(0, creature.facts.length - 1);
    return creature.facts[randomIndex];
}

// Función para cambiar el animal mostrado
function changeCreature() {
    const animalImage = document.getElementById('animal-image');
    const animalName = document.getElementById('animal-name');
    const funFacts = document.getElementById('fun-facts');
    
    // Verificar que hay animales disponibles
    if (seaCreatures.length === 0) {
        console.error('No hay animales disponibles para mostrar');
        return;
    }
    
    // Obtener el siguiente animal
    currentCreatureIndex = (currentCreatureIndex + 1) % seaCreatures.length;
    const creature = seaCreatures[currentCreatureIndex];
    
    // Animación de salida
    animalImage.style.opacity = '0';
    animalImage.style.transform = 'scale(0.8) rotate(180deg)';
    animalName.style.opacity = '0';
    funFacts.style.opacity = '0';
    
    setTimeout(() => {
        // Cambiar imagen, nombre y dato curioso
        animalImage.innerHTML = `<img src="${creature.image}" alt="${creature.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 20px;">`;
        animalName.textContent = creature.name;
        funFacts.textContent = getRandomFact(creature);
        
        // Animación de entrada
        animalImage.style.opacity = '1';
        animalImage.style.transform = 'scale(1) rotate(0deg)';
        animalName.style.opacity = '1';
        funFacts.style.opacity = '1';
        
        // Reiniciar animación del dato curioso
        funFacts.style.animation = 'none';
        setTimeout(() => {
            funFacts.style.animation = 'pulse 3s ease-in-out infinite';
        }, 10);
    }, 500);
}

// Función para cambiar solo el dato curioso
function changeFact() {
    const funFacts = document.getElementById('fun-facts');
    
    // Verificar que hay animales disponibles
    if (seaCreatures.length === 0) {
        console.error('No hay animales disponibles para mostrar datos');
        return;
    }
    
    const creature = seaCreatures[currentCreatureIndex];
    
    // Animación de salida
    funFacts.style.opacity = '0';
    
    setTimeout(() => {
        // Cambiar solo el dato curioso
        funFacts.textContent = getRandomFact(creature);
        
        // Animación de entrada
        funFacts.style.opacity = '1';
        
        // Reiniciar animación
        funFacts.style.animation = 'none';
        setTimeout(() => {
            funFacts.style.animation = 'pulse 3s ease-in-out infinite';
        }, 10);
    }, 300);
}

// Función para crear algas marinas decorativas
function createSeaweed() {
    const oceanBackground = document.querySelector('.ocean-background');
    
    // Crear varias algas
    for (let i = 0; i < 5; i++) {
        const seaweed = document.createElement('div');
        seaweed.className = 'seaweed';
        seaweed.style.left = `${10 + i * 15}%`;
        seaweed.style.height = `${80 + Math.random() * 40}px`;
        seaweed.style.animationDelay = `${i * 0.5}s`;
        oceanBackground.appendChild(seaweed);
    }
}

// Función para crear burbujas adicionales
function createBubbles() {
    const oceanBackground = document.querySelector('.ocean-background');
    
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = bubble.style.height = `${10 + Math.random() * 30}px`;
        bubble.style.animationDuration = `${5 + Math.random() * 5}s`;
        oceanBackground.appendChild(bubble);
        
        // Eliminar burbuja después de la animación
        setTimeout(() => {
            bubble.remove();
        }, 10000);
    }, 2000);
}

// Inicializar la página
async function initializePage() {
    // Primero cargar las URLs de imágenes
    await loadImageUrls();
    
    const animalImage = document.getElementById('animal-image');
    const animalName = document.getElementById('animal-name');
    const funFacts = document.getElementById('fun-facts');
    const changeBtn = document.getElementById('change-btn');
    const changeFactBtn = document.getElementById('change-fact-btn');
    
    // Verificar que se hayan cargado los animales
    if (seaCreatures.length === 0) {
        console.error('No se pudieron cargar los datos de los animales');
        animalName.textContent = 'Error al cargar datos';
        return;
    }
    
    const creature = seaCreatures[currentCreatureIndex];
    
    // Establecer el primer animal
    animalImage.innerHTML = `<img src="${creature.image}" alt="${creature.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 20px;">`;
    animalName.textContent = creature.name;
    funFacts.textContent = getRandomFact(creature);
    
    // Crear elementos decorativos
    createSeaweed();
    createBubbles();
    
    // Agregar event listeners a los botones
    changeBtn.addEventListener('click', changeCreature);
    changeFactBtn.addEventListener('click', changeFact);
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', initializePage);