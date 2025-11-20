// Toggle del menú desplegable
const menuButton = document.querySelector('.menu-button');
const dropdownMenu = document.querySelector('.dropdown-menu');
menuButton.addEventListener('click', function() {
    dropdownMenu.classList.toggle('active');
});
// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    if (!event.target.closest('.menu-container')) {
        dropdownMenu.classList.remove('active');
    }
});

// ===== Chatbot Asistente Virtual =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Abrir/cerrar chatbot
chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.remove('active');
});

// Respuestas automáticas del bot
const botResponses = {
    'hola': '¡Hola! ¿Cómo puedo ayudarte con tus necesidades jurídicas?',
    'horario': 'Nuestros horarios de atención son de lunes a viernes de 9:00 AM a 6:00 PM.',
    'cita': 'Puedes agendar una cita llamando al (XXX) XXX-XXXX o haciendo clic en el botón "Agenda tu cita aquí".',
    'servicios': 'Ofrecemos servicios en derecho civil, penal, laboral, familiar y más. ¿En qué área necesitas asesoría?',
    'contacto': 'Puedes contactarnos por WhatsApp, Instagram o correo electrónico. Encuentra los iconos en la página principal.',
    'ubicacion': 'Estamos ubicados en [dirección]. ¿Necesitas indicaciones específicas?',
    'precios': 'Los honorarios varían según el caso. Te invitamos a agendar una consulta inicial para evaluar tu situación.',
    'gracias': '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?',
    'default': 'Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?'
};

// Función para agregar mensaje
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll automático hacia abajo
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Función para obtener respuesta del bot
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    for (let key in botResponses) {
        if (message.includes(key)) {
            return botResponses[key];
        }
    }
    
    return botResponses['default'];
}

// Enviar mensaje
function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (message) {
        // Agregar mensaje del usuario
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simular "escribiendo..." y responder después de un breve delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 600);
    }
}

// Event listeners para enviar mensaje
chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});