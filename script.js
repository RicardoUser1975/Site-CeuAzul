// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Slider Automático e Manual
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let slideInterval;
const totalSlides = slides.length;

// Função para atualizar o slider
function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Event Listeners dos botões
nextBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Event Listeners dos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        resetInterval();
    });
});

// Slider automático
function startInterval() {
    slideInterval = setInterval(nextSlide, 5000); // 5 segundos
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Iniciar slider automático
startInterval();

// Pausar slider ao passar o mouse
sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderWrapper.addEventListener('mouseleave', () => {
    startInterval();
});

// Validação do Formulário de Contato
const contactForm = document.getElementById('contactForm');
const formGroups = contactForm.querySelectorAll('.form-group');

// Função para mostrar erro
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorSpan.textContent = message;
    errorSpan.classList.add('show');
}

// Função para limpar erro
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorSpan.classList.remove('show');
}

// Validação de email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de telefone (opcional)
function isValidPhone(phone) {
    if (phone === '') return true; // Campo opcional
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
}

// Validar campo individual
function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.previousElementSibling.textContent.split('*')[0].trim();
    
    // Campo obrigatório
    if (input.hasAttribute('required') && value === '') {
        showError(input, `${fieldName} é obrigatório`);
        return false;
    }
    
    // Validação específica por tipo
    if (input.type === 'email' && value !== '') {
        if (!isValidEmail(value)) {
            showError(input, 'E-mail inválido');
            return false;
        }
    }
    
    if (input.type === 'tel' && value !== '') {
        if (!isValidPhone(value)) {
            showError(input, 'Telefone deve ter 10 ou 11 dígitos');
            return false;
        }
    }
    
    // Validação de tamanho mínimo
    if (input.minLength > 0 && value.length < input.minLength) {
        showError(input, `${fieldName} deve ter pelo menos ${input.minLength} caracteres`);
        return false;
    }
    
    clearError(input);
    return true;
}

// Event listeners para validação em tempo real
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    // Validar ao perder foco
    input.addEventListener('blur', () => {
        if (input.value !== '') {
            validateField(input);
        }
    });
    
    // Limpar erro ao digitar
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            clearError(input);
        }
    });
});

// Submit do formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Validar todos os campos
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Se válido, mostrar mensagem de sucesso
    if (isValid) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        
        // Limpar todos os erros
        inputs.forEach(input => {
            clearError(input);
        });
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});