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

// Función para crear algas marinas decorativas mejoradas
function createSeaweed() {
    const oceanBackground = document.querySelector('.ocean-background');
    
    // Tipos de algas
    const seaweedTypes = ['seaweed-type1', 'seaweed-type2', 'seaweed-type3', 'seaweed-type4'];
    
    // Crear 8 algas de diferentes tipos
    for (let i = 0; i < 8; i++) {
        const seaweed = document.createElement('div');
        seaweed.className = 'seaweed';
        
        // Asignar tipo aleatorio
        const randomType = seaweedTypes[Math.floor(Math.random() * seaweedTypes.length)];
        seaweed.classList.add(randomType);
        
        // Posicionar
        seaweed.style.left = `${5 + (i * 12) + Math.random() * 5}%`;
        
        // Altura variada
        const baseHeight = 80 + Math.random() * 60;
        if (randomType === 'seaweed-type1') {
            seaweed.style.borderBottomWidth = `${baseHeight}px`;
        } else if (randomType === 'seaweed-type3') {
            seaweed.style.height = `${baseHeight}px`;
        } else {
            seaweed.style.height = `${baseHeight}px`;
        }
        
        // Animación variada
        seaweed.style.animationDelay = `${Math.random() * 3}s`;
        seaweed.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        // Añadir sombras y efectos adicionales
        if (Math.random() > 0.7) {
            seaweed.style.filter += ' brightness(1.1) saturate(1.2)';
        }
        
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

// Función para crear burbujas de celebración
function createCelebrationBubbles() {
    const celebration = document.querySelector('.celebration') || document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = '';
    document.body.appendChild(celebration);
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble-celebration';
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.width = bubble.style.height = `${10 + Math.random() * 20}px`;
            bubble.style.animationDelay = `${Math.random() * 2}s`;
            celebration.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, 4000);
        }, i * 200);
    }
}

// Función para crear peces de celebración
function createCelebrationFish() {
    const celebration = document.querySelector('.celebration');
    if (!celebration) return;
    
    const fishEmojis = ['🐠', '🐟', '🐡', '🦈', '🐙'];
    const fish = document.createElement('div');
    fish.className = 'fish';
    fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
    fish.style.top = `${20 + Math.random() * 60}%`;
    fish.style.left = '-100px';
    fish.style.animationDelay = `${Math.random() * 1}s`;
    celebration.appendChild(fish);
    
    setTimeout(() => {
        fish.remove();
    }, 3000);
}

// Función para crear estrellas de mar de celebración
function createCelebrationStarfish() {
    const celebration = document.querySelector('.celebration');
    if (!celebration) return;
    
    const starfish = document.createElement('div');
    starfish.className = 'starfish';
    starfish.textContent = '⭐';
    starfish.style.top = `${30 + Math.random() * 50}%`;
    starfish.style.left = `${Math.random() * 80}%`;
    starfish.style.animationDelay = `${Math.random() * 1}s`;
    celebration.appendChild(starfish);
    
    setTimeout(() => {
        starfish.remove();
    }, 2000);
}

// Sistema de Trivia
class TriviaSystem {
    constructor() {
        this.currentCreature = null;
        this.currentQuestion = null;
        this.currentAnswer = null;
        this.isAnswered = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.triviaBtn = document.getElementById('trivia-btn');
        this.triviaModal = document.getElementById('trivia-modal');
        this.closeTrivia = document.getElementById('close-trivia');
        this.triviaQuestion = document.getElementById('trivia-question');
        this.triviaOptions = document.getElementById('trivia-options');
        this.triviaResult = document.getElementById('trivia-result');
        this.nextQuestionBtn = document.getElementById('next-question');
    }
    
    bindEvents() {
        this.triviaBtn.addEventListener('click', () => this.openTrivia());
        this.closeTrivia.addEventListener('click', () => this.closeTriviaModal());
        this.triviaModal.addEventListener('click', (e) => {
            if (e.target === this.triviaModal) {
                this.closeTriviaModal();
            }
        });
        this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
    }
    
    generateQuestion(creature) {
        const facts = creature.facts;
        const correctFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Crear pregunta base con el nombre del animal
        const question = `¿Qué dato es verdadero sobre el ${creature.name}?`;
        
        // Crear opciones asegurando solo una correcta
        const options = [correctFact];
        const usedFacts = new Set([correctFact]);
        
        // Generar 3 opciones incorrectas diferentes
        while (options.length < 4) {
            let wrongFact;
            const otherCreature = seaCreatures[Math.floor(Math.random() * seaCreatures.length)];
            const availableFacts = otherCreature.facts.filter(fact => !usedFacts.has(fact));
            
            if (availableFacts.length > 0) {
                wrongFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
                usedFacts.add(wrongFact);
                options.push(wrongFact);
            } else {
                // Si no hay más facts disponibles, crear una falsa
                const questionType = this.getQuestionType(correctFact);
                wrongFact = this.generateWrongFact(correctFact, questionType);
                usedFacts.add(wrongFact);
                options.push(wrongFact);
            }
        }
        
        // Mezclar opciones
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        return {
            question,
            options,
            correct: correctFact
        };
    }
    
    getQuestionContext(fact) {
        if (fact.includes('años')) return 'este dato sobre años';
        if (fact.includes('km') || fact.includes('metros')) return 'este dato sobre distancia';
        if (fact.includes('kg') || fact.includes('toneladas')) return 'este dato sobre peso';
        if (fact.includes('dientes') || fact.includes('centímetros')) return 'este dato sobre medida';
        if (fact.includes('velocidad') || fact.includes('km/h')) return 'este dato sobre velocidad';
        if (fact.includes('saltar') || fact.includes('altura')) return 'este dato sobre altura';
        return 'este dato';
    }
    
    generateWrongFact(correctFact, questionType) {
        const wrongTemplates = {
            'años': ['Vive hasta 20 años', 'Tiene una vida de 30 años', 'Puede vivir 50 años'],
            'distancia': ['Puede nadar 100 km', 'Viaja 500 km', 'Nada a 2000 metros'],
            'peso': ['Pesa 500 kg', 'Tiene un peso de 100 kg', 'Puede llegar a 1 tonelada'],
            'medida': ['Tiene 50 dientes', 'Mide 10 metros', 'Tiene 20 centímetros'],
            'velocidad': ['Nada a 20 km/h', 'Puede alcanzar 80 km/h', 'Tiene una velocidad de 15 km/h'],
            'altura': ['Puede saltar 1 metro', 'Salta hasta 3 metros', 'Tiene una altura de 5 metros'],
            'dato': ['Tiene características únicas', 'Es un animal especial', 'Tiene habilidades especiales']
        };
        
        const templates = wrongTemplates[questionType] || wrongTemplates['dato'];
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    getQuestionType(fact) {
        if (fact.includes('años')) return 'años';
        if (fact.includes('km') || fact.includes('metros')) return 'distancia';
        if (fact.includes('kg') || fact.includes('toneladas')) return 'peso';
        if (fact.includes('dientes') || fact.includes('centímetros')) return 'medida';
        if (fact.includes('velocidad') || fact.includes('km/h')) return 'velocidad';
        if (fact.includes('saltar') || fact.includes('altura')) return 'altura';
        return 'dato';
    }
    
    openTrivia() {
        if (seaCreatures.length === 0) return;
        
        this.currentCreature = seaCreatures[currentCreatureIndex];
        const triviaData = this.generateQuestion(this.currentCreature);
        
        this.currentQuestion = triviaData.question;
        this.currentAnswer = triviaData.correct;
        this.isAnswered = false;
        
        this.triviaQuestion.textContent = this.currentQuestion;
        this.triviaResult.innerHTML = '';
        this.triviaResult.className = 'trivia-result';
        
        // Ocultar botón "Siguiente Pregunta" al abrir nueva pregunta
        this.nextQuestionBtn.style.display = 'none';
        
        // Crear botones de opciones
        this.triviaOptions.innerHTML = '';
        triviaData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'trivia-option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, button));
            this.triviaOptions.appendChild(button);
        });
        
        this.triviaModal.classList.add('active');
    }
    
    checkAnswer(selectedAnswer, button) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        
        const allOptions = this.triviaOptions.querySelectorAll('.trivia-option');
        
        if (selectedAnswer === this.currentAnswer) {
            // Respuesta correcta
            button.classList.add('correct');
            this.triviaResult.innerHTML = '¡Correcto! 🎉';
            this.triviaResult.className = 'trivia-result success';
            
            // Celebración
            this.createCelebration();
        } else {
            // Respuesta incorrecta
            button.classList.add('incorrect');
            this.triviaResult.innerHTML = `Incorrecto. El dato curioso es: ${this.currentAnswer}`;
            this.triviaResult.className = 'trivia-result error';
            
            // Marcar la respuesta correcta
            allOptions.forEach(option => {
                if (option.textContent === this.currentAnswer) {
                    option.classList.add('correct');
                }
            });
        }
        
        // Deshabilitar todas las opciones
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Mostrar botón "Siguiente Pregunta" después de responder
        this.nextQuestionBtn.style.display = 'flex';
    }
    
    createCelebration() {
        // Crear burbujas
        createCelebrationBubbles();
        
        // Crear peces
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createCelebrationFish(), i * 500);
        }
        
        // Crear estrellas
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createCelebrationStarfish(), i * 300);
        }
    }
    
    nextQuestion() {
        // Solo permitir avanzar si ya se respondió la pregunta actual
        if (!this.isAnswered) {
            this.triviaResult.innerHTML = '¡Primero debes responder la pregunta!';
            this.triviaResult.className = 'trivia-result warning';
            return;
        }
        
        // Generar nueva pregunta para el mismo animal
        const triviaData = this.generateQuestion(this.currentCreature);
        
        this.currentQuestion = triviaData.question;
        this.currentAnswer = triviaData.correct;
        this.isAnswered = false;
        
        this.triviaQuestion.textContent = this.currentQuestion;
        this.triviaResult.innerHTML = '';
        this.triviaResult.className = 'trivia-result';
        
        // Ocultar botón "Siguiente Pregunta" hasta que se responda
        this.nextQuestionBtn.style.display = 'none';
        
        // Crear botones de opciones
        this.triviaOptions.innerHTML = '';
        triviaData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'trivia-option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, button));
            this.triviaOptions.appendChild(button);
        });
    }
    
    closeTriviaModal() {
        this.triviaModal.classList.remove('active');
        
        // Limpiar celebración si existe
        const celebration = document.querySelector('.celebration');
        if (celebration) {
            celebration.remove();
        }
    }
}

// Inicializar sistema de trivia
const triviaSystem = new TriviaSystem();

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
    
    // Asegurar que los elementos iniciales sean visibles
    setTimeout(() => {
        const img = animalImage.querySelector('img');
        if (img) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
        animalName.style.opacity = '1';
        funFacts.style.opacity = '1';
    }, 100);
    
    // Crear elementos decorativos
    createSeaweed();
    createBubbles();
    
    // Agregar event listeners a los botones
    changeBtn.addEventListener('click', changeCreature);
    changeFactBtn.addEventListener('click', changeFact);
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', initializePage);