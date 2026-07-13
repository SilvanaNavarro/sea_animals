// Datos de los animales marinos - ahora se cargan desde el archivo JSON
let seaCreatures = [];
let currentCreatureIndex = 0;
let currentFactIndex = 0;

// Contador de respuestas correctas
let correctAnswersCount = 0;
const PREMIOS = {
    5: "Ganaste un vaso de jugo! 🥤",
    15: "Ganaste un dulce! 🍭",
    30: "Ganaste 30 minutos de Youtube! 📱",
    45: "Ganaste 1 hora de celular! 🎮"
};

// Sistemas para evitar repeticiones
let usedFacts = new Map(); // Mapa: animal -> Set de facts usados
let usedQuestions = new Set(); // Set de preguntas ya usadas (string)

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

// Función para obtener un dato curioso aleatorio (sin repeticiones)
function getRandomFact(creature) {
    if (!usedFacts.has(creature.name)) {
        usedFacts.set(creature.name, new Set());
    }
    
    const usedFactsForCreature = usedFacts.get(creature.name);
    const availableFacts = creature.facts.filter(fact => !usedFactsForCreature.has(fact));
    
    // Si todos los facts ya se usaron, reiniciar el conjunto
    if (availableFacts.length === 0) {
        usedFactsForCreature.clear();
        return creature.facts[0]; // Devolver el primer fact
    }
    
    const randomIndex = getRandomNumber(0, availableFacts.length - 1);
    const selectedFact = availableFacts[randomIndex];
    usedFactsForCreature.add(selectedFact);
    
    return selectedFact;
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

        if (facts.length === 0) {
            const randomCreature = seaCreatures[Math.floor(Math.random() * seaCreatures.length)];
            return this.generateQuestion(randomCreature);
        }

        // Seleccionar fact correcto no usado recientemente
        let correctFact;
        const availableFacts = facts.filter(fact => !usedQuestions.has(`${creature.name}: ${fact}`));

        if (availableFacts.length === 0) {
            usedQuestions.clear();
            correctFact = facts[0];
        } else {
            correctFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
        }
        usedQuestions.add(`${creature.name}: ${correctFact}`);

        // Opción 2: fact numérico → pregunta específica con distractores numéricos
        const numericResult = this.tryNumericQuestion(correctFact, creature);
        if (numericResult) return numericResult;

        // Fact cualitativo → distractores de otros animales
        const question = `¿Qué dato es verdadero sobre el ${creature.name}?`;
        const options = [correctFact];
        const usedOptions = new Set([correctFact]);

        while (options.length < 4) {
            let wrongFact;
            const otherCreatures = seaCreatures.filter(c => c.name !== creature.name);
            const shuffled = otherCreatures.sort(() => Math.random() - 0.5);

            let found = false;
            for (const other of shuffled) {
                const candidates = other.facts.filter(fact =>
                    !usedOptions.has(fact) &&
                    !creature.facts.includes(fact) &&
                    !this.isSemanticallySimilar(fact, creature.facts)
                );
                if (candidates.length > 0) {
                    wrongFact = candidates[Math.floor(Math.random() * candidates.length)];
                    usedOptions.add(wrongFact);
                    found = true;
                    break;
                }
            }

            if (!found) {
                wrongFact = this.generateWrongFact(correctFact, this.getQuestionType(correctFact));
                usedOptions.add(wrongFact);
            }

            options.push(wrongFact);
        }

        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return { question, options, correct: correctFact };
    }

    tryNumericQuestion(correctFact, creature) {
        const pattern = /(\d[\d,.]*)(\s*)(km\/h|toneladas?|dientes|centímetros?|huevos?|metros?|horas?|años?|año|kg|km|sentidos?)\b/i;
        const match = correctFact.match(pattern);
        if (!match) return null;

        const numStr  = match[1];
        const gap     = match[2];
        const unit    = match[3].toLowerCase();
        const num     = parseFloat(numStr.replace(/,/g, ''));
        if (!num || num <= 0) return null;

        const wrongNums = this.generateWrongNumbers(num);
        if (wrongNums.length < 3) return null;

        // Construir opciones reemplazando solo el número en el texto original
        const options = [correctFact];
        for (const wn of wrongNums) {
            const wnStr = wn >= 10000 ? wn.toLocaleString('es-CL') : String(wn);
            const before  = correctFact.substring(0, match.index);
            const rest    = correctFact.substring(match.index).replace(numStr, wnStr);
            const wrongFact = before + rest;
            if (!options.includes(wrongFact)) options.push(wrongFact);
        }

        if (options.length < 4) return null;

        // Solo unidades inequívocas reciben pregunta específica.
        // km, metros, kg, toneladas varían de contexto → pregunta genérica para evitar contradicciones.
        const specificTemplates = {
            'km/h':    `¿A qué velocidad puede nadar el ${creature.name}?`,
            'años':    `¿Cuántos años puede vivir el ${creature.name}?`,
            'año':     `¿Cuántos años puede vivir el ${creature.name}?`,
            'dientes': `¿Cuántos dientes tiene el ${creature.name}?`,
            'huevos':  `¿Cuántos huevos puede poner el ${creature.name}?`,
            'horas':   `¿Cuántas horas puede aguantar el ${creature.name}?`,
        };
        const question = specificTemplates[unit] || `¿Cuál de estos datos es correcto sobre el ${creature.name}?`;

        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return { question, options: options.slice(0, 4), correct: correctFact };
    }

    generateWrongNumbers(correctNum) {
        const multipliers = [0.1, 0.2, 0.3, 0.5, 2, 3, 5, 8, 10].sort(() => Math.random() - 0.5);
        const results = [];
        const seen = new Set([correctNum]);
        for (const mult of multipliers) {
            let n = Math.round(correctNum * mult);
            if (n <= 0) n = 1;
            if (seen.has(n)) continue;
            seen.add(n);
            results.push(n);
            if (results.length === 3) break;
        }
        return results;
    }
    
    getKeywords(fact) {
        const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
        const stopwords = new Set([
            'tiene', 'tienen', 'son', 'es', 'un', 'una', 'de', 'en', 'con',
            'los', 'las', 'sus', 'por', 'que', 'del', 'al', 'el', 'la', 'y',
            'o', 'a', 'se', 'no', 'mas', 'muy', 'hasta', 'como', 'pero', 'si',
            'cuando', 'donde', 'porque', 'para', 'entre', 'sin', 'sobre',
            'pueden', 'puede', 'viven', 'vive', 'su', 'les', 'lo', 'han',
            'estan', 'esta', 'este', 'estos', 'otras', 'otra', 'otros', 'otro',
            'cada', 'solo', 'tambien', 'debido'
        ]);
        return normalize(fact).toLowerCase()
            .replace(/[^a-z\s]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 3 && !stopwords.has(w));
    }

    isSemanticallySimilar(distractorFact, animalFacts) {
        const dk = this.getKeywords(distractorFact);
        if (dk.length === 0) return false;
        for (const animalFact of animalFacts) {
            const ak = this.getKeywords(animalFact);
            const overlap = dk.filter(k => ak.includes(k)).length;
            if (overlap >= 2 || (dk.length <= 2 && overlap >= 1)) return true;
        }
        return false;
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
            'años': ['Vive hasta 20 años', 'Tiene una vida de 30 años', 'Puede vivir 50 años', 'Vive solo 5 años'],
            'distancia': ['Puede nadar 100 km', 'Viaja 500 km', 'Nada a 2000 metros', 'Viaja 1000 km'],
            'peso': ['Pesa 500 kg', 'Tiene un peso de 100 kg', 'Puede llegar a 1 tonelada', 'Pesa 2 toneladas'],
            'medida': ['Tiene 50 dientes', 'Mide 10 metros', 'Tiene 20 centímetros', 'Mide 5 metros'],
            'velocidad': ['Nada a 20 km/h', 'Puede alcanzar 80 km/h', 'Tiene una velocidad de 15 km/h', 'Nada a 25 km/h'],
            'altura': ['Puede saltar 1 metro', 'Salta hasta 3 metros', 'Tiene una altura de 5 metros', 'Salta 2 metros'],
            'dato': ['Tiene características únicas', 'Es un animal especial', 'Tiene habilidades especiales', 'Es muy común']
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
            
            // Incrementar contador de respuestas correctas
            correctAnswersCount++;
            
            // Verificar si hay premio
            const premio = PREMIOS[correctAnswersCount];
            if (premio) {
                // Si hay premio, mostrar mensaje de correcto y luego el premio después de 2 segundos
                setTimeout(() => {
                    this.showPrizeAndChangeAnimal(premio);
                }, 2000);
            } else {
                // Si no hay premio, mostrar mensaje de correcto y luego siguiente pregunta después de 2 segundos
                setTimeout(() => {
                    this.nextQuestion();
                }, 2000);
            }
            
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
        
        // Mostrar botón "Siguiente Pregunta" después de responder solo si no hay premio
        if (!PREMIOS[correctAnswersCount]) {
            this.nextQuestionBtn.style.display = 'flex';
        }
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
    
    checkForPrize() {
        const premio = PREMIOS[correctAnswersCount];
        if (premio) {
            setTimeout(() => {
                this.showPrizeModal(premio);
            }, 1000);
        }
    }
    
    showPrizeModal(premio) {
        // Crear modal de premio si no existe
        let prizeModal = document.getElementById('prize-modal');
        if (!prizeModal) {
            prizeModal = document.createElement('div');
            prizeModal.id = 'prize-modal';
            prizeModal.className = 'prize-modal';
            prizeModal.innerHTML = `
                <div class="prize-content">
                    <h2>🎉 ¡FELICIDADES! 🎉</h2>
                    <div class="prize-emoji">🏆</div>
                    <p class="prize-text">${premio}</p>
                    <button class="prize-close-btn">Continuar Jugando</button>
                </div>
            `;
            document.body.appendChild(prizeModal);
            
            // Agregar evento al botón de cerrar
            const closeBtn = prizeModal.querySelector('.prize-close-btn');
            closeBtn.addEventListener('click', () => {
                prizeModal.classList.remove('active');
                // Volver a abrir la trivia después de cerrar el modal de premio
                setTimeout(() => {
                    triviaSystem.openTrivia();
                }, 300);
            });
            
            // Cerrar al hacer clic fuera
            prizeModal.addEventListener('click', (e) => {
                if (e.target === prizeModal) {
                    prizeModal.classList.remove('active');
                }
            });
        } else {
            // Si el modal ya existe, actualizar el contenido y eliminar eventos anteriores
            const prizeText = prizeModal.querySelector('.prize-text');
            prizeText.textContent = premio;
            
            // Eliminar el botón anterior y crear uno nuevo para evitar acumulación de eventos
            const closeBtn = prizeModal.querySelector('.prize-close-btn');
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            // Agregar evento al nuevo botón usando la referencia global triviaSystem
            newCloseBtn.addEventListener('click', () => {
                prizeModal.classList.remove('active');
                // Volver a abrir la trivia después de cerrar el modal de premio
                setTimeout(() => {
                    triviaSystem.openTrivia();
                }, 300);
            });
        }
        
        // Mostrar modal
        prizeModal.classList.add('active');
        
        // Iniciar animación de peces nadando
        this.createPrizeFishAnimation();
    }
    
    showPrizeAndChangeAnimal(premio) {
        // Crear modal de premio si no existe
        let prizeModal = document.getElementById('prize-modal');
        if (!prizeModal) {
            prizeModal = document.createElement('div');
            prizeModal.id = 'prize-modal';
            prizeModal.className = 'prize-modal';
            prizeModal.innerHTML = `
                <div class="prize-content">
                    <h2>🎉 ¡FELICIDADES! 🎉</h2>
                    <div class="prize-emoji">🏆</div>
                    <p class="prize-text">${premio}</p>
                    <button class="prize-close-btn">¡Siguiente Animal!</button>
                </div>
            `;
            document.body.appendChild(prizeModal);
            
            // Agregar evento al botón de cerrar
            const closeBtn = prizeModal.querySelector('.prize-close-btn');
            closeBtn.addEventListener('click', () => {
                prizeModal.classList.remove('active');
                // Cambiar de animal después de cerrar el modal de premio
                setTimeout(() => {
                    this.closeTriviaModal();
                    this.changeToNextAnimal();
                }, 300);
            });
            
            // Cerrar al hacer clic fuera
            prizeModal.addEventListener('click', (e) => {
                if (e.target === prizeModal) {
                    prizeModal.classList.remove('active');
                    // Cambiar de animal después de cerrar el modal de premio
                    setTimeout(() => {
                        this.closeTriviaModal();
                        this.changeToNextAnimal();
                    }, 300);
                }
            });
        } else {
            // Si el modal ya existe, actualizar el contenido y eliminar eventos anteriores
            const prizeText = prizeModal.querySelector('.prize-text');
            prizeText.textContent = premio;
            
            // Eliminar el botón anterior y crear uno nuevo para evitar acumulación de eventos
            const closeBtn = prizeModal.querySelector('.prize-close-btn');
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            // Agregar evento al nuevo botón usando la referencia global triviaSystem
            newCloseBtn.addEventListener('click', () => {
                prizeModal.classList.remove('active');
                // Cambiar de animal después de cerrar el modal de premio
                setTimeout(() => {
                    this.closeTriviaModal();
                    this.changeToNextAnimal();
                }, 300);
            });
        }
        
        // Mostrar modal
        prizeModal.classList.add('active');
        
        // Iniciar animación de peces nadando
        this.createPrizeFishAnimation();
    }
    
    changeToNextAnimal() {
        // Cambiar al siguiente animal
        changeCreature();
        
        // Mostrar mensaje de cambio de animal
        const triviaResult = document.getElementById('trivia-result');
        if (triviaResult) {
            triviaResult.innerHTML = '¡Cambiamos a otro animal para que sigas aprendiendo! 🐠';
            triviaResult.className = 'trivia-result success';
            triviaResult.style.display = 'block';
            
            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                triviaResult.style.display = 'none';
            }, 3000);
        }
    }
    
    createPrizeFishAnimation() {
        const fishTypes = ['🐠', '🐟', '🐡', '🦈', '🐙', '🐋', '🐳', '🦭'];
        
        // Asegurarse de que el modal de premio esté visible para que los peces se vean bien
        const prizeModal = document.getElementById('prize-modal');
        if (prizeModal) {
            prizeModal.style.zIndex = '2001'; // Asegurar que el modal esté debajo de los peces
        }
        
        // Crear peces nadando horizontalmente
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.className = 'prize-fish prize-fish-horizontal';
                fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
                fish.style.top = `${15 + Math.random() * 60}%`;
                fish.style.animationDelay = `${i * 0.5}s`;
                fish.style.animationDuration = `${3 + Math.random() * 2}s`;
                document.body.appendChild(fish);
                
                // Eliminar el pez después de la animación
                setTimeout(() => {
                    fish.remove();
                }, 5000);
            }, i * 800);
        }
        
        // Crear peces nadando verticalmente
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.className = 'prize-fish prize-fish-vertical';
                fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
                fish.style.left = `${15 + Math.random() * 70}%`;
                fish.style.animationDelay = `${i * 0.7}s`;
                fish.style.animationDuration = `${4 + Math.random() * 2}s`;
                document.body.appendChild(fish);
                
                // Eliminar el pez después de la animación
                setTimeout(() => {
                    fish.remove();
                }, 6000);
            }, i * 1000);
        }
        
        // Crear peces nadando en diagonal
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.className = 'prize-fish prize-fish-diagonal';
                fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
                fish.style.top = `${10 + Math.random() * 40}%`;
                fish.style.left = `${10 + Math.random() * 40}%`;
                fish.style.animationDelay = `${i * 0.6}s`;
                fish.style.animationDuration = `${3.5 + Math.random() * 1.5}s`;
                document.body.appendChild(fish);
                
                // Eliminar el pez después de la animación
                setTimeout(() => {
                    fish.remove();
                }, 5500);
            }, i * 900);
        }
        
        // Crear cardumen de peces
        setTimeout(() => {
            const fishSchool = document.createElement('div');
            fishSchool.className = 'fish-school';
            
            const schoolFishTypes = ['🐠', '🐟', '🐡'];
            for (let i = 0; i < 4; i++) {
                const fish = document.createElement('div');
                fish.className = 'fish';
                fish.textContent = schoolFishTypes[Math.floor(Math.random() * schoolFishTypes.length)];
                fish.style.setProperty('--delay', i);
                fishSchool.appendChild(fish);
            }
            
            document.body.appendChild(fishSchool);
            
            // Eliminar el cardumen después de la animación
            setTimeout(() => {
                fishSchool.remove();
            }, 5000);
        }, 1000);
        
        // Crear peces saltarines
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.className = 'jumping-fish';
                fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
                fish.style.left = `${20 + Math.random() * 60}%`;
                fish.style.bottom = `${10 + Math.random() * 30}%`;
                fish.style.animationDelay = `${i * 0.8}s`;
                document.body.appendChild(fish);
                
                // Eliminar el pez después de la animación
                setTimeout(() => {
                    fish.remove();
                }, 2000);
            }, i * 600);
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
    
    // Inicializar sistemas de evitación de repeticiones
    usedFacts.clear();
    usedQuestions.clear();
    
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