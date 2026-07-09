// Datos de los animales marinos - ahora se cargan desde el archivo JSON
let seaCreatures = [];
let currentCreatureIndex = 0;
let currentFactIndex = 0;

// Función para cargar datos desde el archivo JSON
async function loadSeaCreaturesData() {
    try {
        const response = await fetch('animales.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        seaCreatures = await response.json();
        
        console.log('Datos de animales cargados correctamente');
        console.log('Animales cargados:', seaCreatures.map(c => c.name));
        
    } catch (error) {
        console.error('Error al cargar datos de animales:', error);
        // Mostrar mensaje de error
        document.getElementById('animal-name').textContent = 'Error al cargar datos';
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

// Función para mostrar información de un animal específico
function showAnimalInfo(index) {
    if (index < 0 || index >= seaCreatures.length) return;
    
    currentCreatureIndex = index;
    const creature = seaCreatures[currentCreatureIndex];
    
    const animalImage = document.getElementById('animal-image');
    const animalName = document.getElementById('animal-name');
    const funFacts = document.getElementById('fun-facts');
    
     // Animación de salida solo para la imagen
    const img = animalImage.querySelector('img');
    if (img) {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
    }
    
    animalName.style.opacity = '0';
    funFacts.style.opacity = '0';
    
    setTimeout(() => {
        // Cambiar imagen, nombre y dato curioso
        animalImage.innerHTML = `<img src="${creature.imageUrl}" alt="${creature.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 20px;">`;
        animalName.textContent = creature.name;
        funFacts.textContent = getRandomFact(creature);
        
        // Animación de entrada solo para la nueva imagen
        const newImg = animalImage.querySelector('img');
        if (newImg) {
            newImg.style.opacity = '1';
            newImg.style.transform = 'scale(1)';
        }
        
        animalName.style.opacity = '1';
        funFacts.style.opacity = '1';
        
        
    }, 300);
}

// Función para cambiar el animal mostrado
function changeCreature() {
    // Verificar que hay animales disponibles
    if (seaCreatures.length === 0) {
        console.error('No hay animales disponibles para mostrar');
        return;
    }
    
    // Obtener el siguiente animal
    currentCreatureIndex = (currentCreatureIndex + 1) % seaCreatures.length;
    showAnimalInfo(currentCreatureIndex);
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
    // Cargar los datos de los animales
    await loadSeaCreaturesData();
    
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
    
    // Establecer el primer animal
    const creature = seaCreatures[currentCreatureIndex];
    animalImage.innerHTML = `<img src="${creature.imageUrl}" alt="${creature.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 20px;">`;
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