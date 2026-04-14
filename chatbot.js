const chatbotData = {
    // Personal information
    name: "Hodan Mohamed",
    title: "2nd year Computer Engineering student",
    location: "Djibouti",
    email: "hodan.mohamed@univ.edu.dj",
    phone: "+253 77 73 15 55",
    
    // Education
    education: [
        "2025 - present: 2nd year Computer Engineering - Faculty of Engineering, Djibouti",
        "2024 - 2025: 1st year Computer Engineering - Faculty of Engineering, Djibouti",
        "2023 - 2024: Bachelor's degree in Science" ,
        "2022 - 2023: Baccalaureate - Djibouti"
    ],
    
    // Technical skills
    technicalSkills: [
        "Languages: Python, C, C++, JavaScript, HTML/CSS",
        "Frameworks: Bootstrap, Node.js",
        "Tools: Git/GitHub, Draw.io, TinkerCAD, Matlab",
        "Concepts: OOP, UI/UX Design"
    ],
    
    // Spoken languages
    languages: [
        "French (Native)",
        "Arabic (Native)",
        "Somali (Native)",
        "English (Intermediate)"
    ],
    
    // Projects (ONLY 3 PROJECTS)
    projects: [
        {
            name: "Glino Game",
            description: "C++ game built with Object-Oriented Programming",
            github: "https://github.com/hodanmedahmed2006-source/Projet-informatique-hodan",
            onlineRun: null
        },
        {
            name: "Student Service Desk",
            description: "Python app to manage student records with OOP and unit tests",
            github: "https://github.com/hodanmedahmed2006-source/Projet-informatique-hodan",
            onlineRun: null
        },
        {
            name: "Student Score Manager",
            description: "C++ program to manage student scores - display, calculate average, update, save to file",
            github: null,
            onlineRun: "https://onlinegdb.com/z-WLW5IFy"
        }
    ],
    
    // Interests
    interests: ["Web development", "UI/UX Design", "Creative coding", "Innovative technologies"]
};

// Bot responses
const botResponses = {
    greeting: [
        "Hello! I'm Hodan's virtual assistant. How can I help you?",
        "Hi! Ask me anything about Hodan's profile!",
        "Welcome! What would you like to know about Hodan?"
    ],
    farewell: [
        "Goodbye! Feel free to come back if you have more questions.",
        "See you soon on Hodan's portfolio!"
    ],
    unknown: [
        "I didn't quite understand. Here's what I can tell you about:\n• Who is Hodan?\n• Education\n• Skills\n• Languages\n• Projects\n• Contact",
        "Can you rephrase? I can answer about education, skills, projects, or contact info."
    ]
};

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.createChatbotElements();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }
    
    createChatbotElements() {
        // Create chatbot button
        this.button = document.createElement('button');
        this.button.className = 'chatbot-button';
        this.button.innerHTML = '<i class="bi bi-chat-dots-fill"></i>';
        this.button.setAttribute('aria-label', 'Open chat');
        document.body.appendChild(this.button);
        
        // Create chat container
        this.container = document.createElement('div');
        this.container.className = 'chatbot-container';
        this.container.innerHTML = `
            <div class="chatbot-header">
                <h3><i class="bi bi-robot"></i> Chatbot!</h3>
                <button class="close-chatbot"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="chatbot-messages"></div>
            <div class="quick-replies" id="quickReplies"></div>
            <div class="chatbot-input">
                <input type="text" placeholder="Type your message..." id="chatbotInput">
                <button id="sendMessage"><i class="bi bi-send-fill"></i></button>
            </div>
        `;
        document.body.appendChild(this.container);
        
        this.messagesContainer = this.container.querySelector('.chatbot-messages');
        this.input = this.container.querySelector('#chatbotInput');
        this.quickRepliesContainer = this.container.querySelector('#quickReplies');
    }
    
    attachEventListeners() {
        this.button.addEventListener('click', () => this.toggleChat());
        this.container.querySelector('.close-chatbot').addEventListener('click', () => this.toggleChat());
        this.container.querySelector('#sendMessage').addEventListener('click', () => this.sendUserMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendUserMessage();
        });
    }
    
    addWelcomeMessage() {
        const randomGreeting = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        this.addMessage(randomGreeting, 'bot');
        this.updateQuickReplies();
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-bubble">${this.formatMessage(text)}</div>`;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    formatMessage(text) {
        // Replace URLs with clickable links
        return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }
    
    updateQuickReplies() {
        this.quickRepliesContainer.innerHTML = '';
        const suggestions = ['👤 Who is Hodan?', '🎓 Education', '💻 Skills', '🗣️ Languages', '📁 Projects', '📞 Contact'];
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => {
                this.input.value = suggestion;
                this.sendUserMessage();
            });
            this.quickRepliesContainer.appendChild(btn);
        });
    }
    
    processUserMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // Greetings
        if (lowerMsg.match(/bonjour|salut|coucou|hello|hi|hey|good morning|good afternoon/)) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        }
        
        // Goodbye
        if (lowerMsg.match(/goodbye|bye|see you|farewell|ciao|thanks bye/)) {
            return botResponses.farewell[Math.floor(Math.random() * botResponses.farewell.length)];
        }
        
        // Who is Hodan? / Introduction
        if (lowerMsg.match(/who|introduce|present yourself|tell me about yourself|about hodan/)) {
            return `I am ${chatbotData.name}, a ${chatbotData.title} from ${chatbotData.location}. Passionate about technology and web development!`;
        }
        
        // Name
        if (lowerMsg.match(/name|your name|call you/)) {
            return `My name is ${chatbotData.name}.`;
        }
        
        // Education / Studies
        if (lowerMsg.match(/education|study|studies|learn|university|school|degree|diploma|academic/)) {
            return `📚 Here is my academic background:\n${chatbotData.education.map(e => `• ${e}`).join('\n')}`;
        }
        
        // Skills
        if (lowerMsg.match(/skill|technical|know|can do|proficient|technique/)) {
            return `💻 Technical skills:\n${chatbotData.technicalSkills.map(s => `• ${s}`).join('\n')}`;
        }
        
        // Languages
        if (lowerMsg.match(/language|speak|lingual|french|english|arabic|somali/)) {
            return `🗣️ Languages I speak:\n${chatbotData.languages.map(l => `• ${l}`).join('\n')}`;
        }
        
        // Projects
        if (lowerMsg.match(/project|work|github|portfolio|achievement|built/)) {
            let projectsText = "📁 Here are my 3 projects:\n\n";
            chatbotData.projects.forEach(p => {
                projectsText += `• ${p.name}: ${p.description}\n`;
                if (p.github) projectsText += `  🔗 GitHub: ${p.github}\n`;
                if (p.onlineRun) projectsText += `  🚀 Run Online: ${p.onlineRun}\n`;
                projectsText += "\n";
            });
            return projectsText;
        }
        
        // Specific project: Student Score Manager
        if (lowerMsg.match(/score manager|student score|onlinegdb|run code|score/)) {
            return `📊 Student Score Manager:\n${chatbotData.projects[2].description}\n\n🚀 Run the code directly here: ${chatbotData.projects[2].onlineRun}`;
        }
        
        // Specific project: Glino Game
        if (lowerMsg.match(/glino|game|c\\+\\+ game/)) {
            return `🎮 Glino Game:\n${chatbotData.projects[0].description}\n\n🔗 GitHub: ${chatbotData.projects[0].github}`;
        }
        
        // Specific project: Student Service Desk
        if (lowerMsg.match(/service desk|student service|python app/)) {
            return `👥 Student Service Desk:\n${chatbotData.projects[1].description}\n\n🔗 GitHub: ${chatbotData.projects[1].github}`;
        }
        
        // Contact
        if (lowerMsg.match(/contact|email|mail|phone|telephone|call|reach|get in touch|coordinate/)) {
            return `📞 Contact me:\n• Email: ${chatbotData.email}\n• Phone: ${chatbotData.phone}`;
        }
        
        // Interests / Hobbies
        if (lowerMsg.match(/interest|hobby|passion|like|love|enjoy|free time/)) {
            return `❤️ My interests:\n${chatbotData.interests.map(i => `• ${i}`).join('\n')}`;
        }
        
        // CV / Resume
        if (lowerMsg.match(/cv|resume|curriculum vitae/)) {
            return "📄 You can view my complete CV on the 'Resume' page of this portfolio!";
        }
        
        // Experience
        if (lowerMsg.match(/experience|internship|work|job|professional/)) {
            return "🎓 As a 2nd year student, I've developed several academic projects in C++, Python, and web development. Check the 'Portfolio' section for more details!";
        }
        
        // Thanks
        if (lowerMsg.match(/thank|thanks|appreciate/)) {
            return "You're welcome! 😊 Feel free to ask me anything else about Hodan's profile.";
        }
        
        // Default response
        return botResponses.unknown[Math.floor(Math.random() * botResponses.unknown.length)];
    }
    
    async sendUserMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.input.value = '';
        this.showTypingIndicator();
        
        // Simulate thinking delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processUserMessage(message);
            this.addMessage(response, 'bot');
            this.updateQuickReplies();
        }, 600);
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.container.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            this.input.focus();
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
