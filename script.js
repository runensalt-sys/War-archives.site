// Поле "Ваше имя" (line2)
    const nameField = document.querySelector('.line2');
    
    // Поле "Ваш e-mail" (line3)
    const emailField = document.querySelector('.line3');
    
    // Поле "Тема сообщения" (line1)
    const subjectField = document.querySelector('.line1');
    
    // Поле "Текст сообщения" (square14) - серая область для многострочного текста
    const messageField = document.querySelector('.square14');
    
    // Кнопка "Отправить" (square13)
    const submitButton = document.querySelector('.square13');
        submitButton.addEventListener('mouseenter', () => {
            submitButton.style.backgroundColor = '#733535';
            submitButton.style.transform = 'scale(1.02)';
        });
        submitButton.addEventListener('mouseleave', () => {
            submitButton.style.backgroundColor = '#1E1E1E';
            submitButton.style.transform = 'scale(1)';
        });
    
    // 2. ДОБАВЛЯЕМ ФУНКЦИОНАЛ ВАЛИДАЦИИ И ОТПРАВКИ
    
    // Функция для отображения ошибок
    function showError(element, message) {
        // Удаляем старую ошибку
        const oldError = element.parentElement?.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        // Создаём новую
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.fontFamily = 'Gotham Pro Light, sans-serif';
        element.parentElement?.appendChild(errorDiv);
        
        // Подсвечиваем поле
        element.style.borderBottom = '2px solid #ff6b6b';
    }
    
    function clearError(element) {
        const error = element.parentElement?.querySelector('.error-message');
        if (error) error.remove();
        element.style.borderBottom = '';
    }
    
    // Получаем значения полей
    function getName() {
        const input = document.querySelector('.line2 input');
        return input ? input.value.trim() : '';
    }
    
    function getEmail() {
        const input = document.querySelector('.line3 input');
        return input ? input.value.trim() : '';
    }
    
    function getSubject() {
        const input = document.querySelector('.line1 input');
        return input ? input.value.trim() : '';
    }
    
    function getMessage() {
        const textarea = document.querySelector('.square14 textarea');
        return textarea ? textarea.value.trim() : '';
    }
    
    // Валидация
    function validateName() {
        const name = getName();
        const field = document.querySelector('.line2');
        if (!name) {
            showError(field, 'Пожалуйста, укажите ваше имя');
            return false;
        }
        if (name.length < 2) {
            showError(field, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        clearError(field);
        return true;
    }
    
    function validateEmail() {
        const email = getEmail();
        const field = document.querySelector('.line3');
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        
        if (!email) {
            showError(field, 'Введите ваш e-mail');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(field, 'Введите корректный e-mail (пример: name@domain.ru)');
            return false;
        }
        clearError(field);
        return true;
    }
    
    function validateSubject() {
        const subject = getSubject();
        const field = document.querySelector('.line1');
        if (!subject) {
            showError(field, 'Укажите тему сообщения');
            return false;
        }
        if (subject.length < 3) {
            showError(field, 'Тема должна содержать минимум 3 символа');
            return false;
        }
        clearError(field);
        return true;
    }
    
    function validateMessage() {
        const message = getMessage();
        const field = document.querySelector('.square14');
        if (!message) {
            showError(field, 'Напишите текст сообщения');
            return false;
        }
        if (message.length < 10) {
            showError(field, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        clearError(field);
        return true;
    }
    
    function validateAll() {
        return validateName() & validateEmail() & validateSubject() & validateMessage();
    }
    
    // Показ уведомления
    function showNotification(message, isSuccess = true) {
        // Удаляем старое уведомление
        const oldNotif = document.querySelector('.form-notification');
        if (oldNotif) oldNotif.remove();
        
        // Создаём новое
        const notif = document.createElement('div');
        notif.className = 'form-notification';
        notif.textContent = message;
        notif.style.position = 'fixed';
        notif.style.bottom = '20px';
        notif.style.right = '20px';
        notif.style.padding = '15px 25px';
        notif.style.borderRadius = '8px';
        notif.style.fontFamily = 'Gotham Pro Light, sans-serif';
        notif.style.fontSize = '14px';
        notif.style.fontWeight = 'bold';
        notif.style.zIndex = '10000';
        notif.style.animation = 'slideIn 0.3s ease';
        
        if (isSuccess) {
            notif.style.backgroundColor = '#4caf50';
            notif.style.color = 'white';
        } else {
            notif.style.backgroundColor = '#f44336';
            notif.style.color = 'white';
        }
        
        document.body.appendChild(notif);
        
        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Удаляем через 4 секунды
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 4000);
        
        // Добавляем анимацию исчезновения
        const styleOut = document.createElement('style');
        styleOut.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleOut);
    }
    
    // Отправка формы
    function submitForm() {
        if (!validateAll()) {
            showNotification(' Пожалуйста, исправьте ошибки в форме', false);
            return;
        }
        
        // Собираем данные
        const formData = {
            name: getName(),
            email: getEmail(),
            subject: getSubject(),
            message: getMessage(),
            timestamp: new Date().toLocaleString('ru-RU')
        };
        
        // Показываем сообщение об успехе
        showNotification(` Спасибо, ${formData.name}! Ваше обращение принято. Мы ответим на ${formData.email} в ближайшее время.`, true);
        
        // Выводим в консоль (для отладки)
        console.log('Отправленные данные:', formData);
        
        // Очищаем поля (опционально - раскомментируйте если нужно)
        // const nameInput = document.querySelector('.line2 input');
        // const emailInput = document.querySelector('.line3 input');
        // const subjectInput = document.querySelector('.line1 input');
        // const messageTextarea = document.querySelector('.square14 textarea');
        // if (nameInput) nameInput.value = '';
        // if (emailInput) emailInput.value = '';
        // if (subjectInput) subjectInput.value = '';
        // if (messageTextarea) messageTextarea.value = '';
        
        // Если нужна реальная отправка на сервер - раскомментируйте:
        /*
        fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('✅ Форма успешно отправлена!', true);
        })
        .catch(error => {
            showNotification('❌ Ошибка при отправке', false);
        });
        */
    }
    
    // Привязываем событие на кнопку
    if (submitButton) {
        submitButton.addEventListener('click', submitForm);
    }
    
    // Добавляем валидацию при потере фокуса
    const nameInput = document.querySelector('.line2 input');
    const emailInput = document.querySelector('.line3 input');
    const subjectInput = document.querySelector('.line1 input');
    const messageTextarea = document.querySelector('.square14 textarea');
    
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (subjectInput) subjectInput.addEventListener('blur', validateSubject);
    if (messageTextarea) messageTextarea.addEventListener('blur', validateMessage);
    
    // Также отправка по Enter в последнем поле
    if (messageTextarea) {
        messageTextarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitForm();
            }
        });
    }
    
    console.log('Форма активирована! Все поля готовы к вводу.');

    const readMoreButton = document.querySelector('.square11');
    const targetElement = document.querySelector('.title-vollk');
    
    if (readMoreButton) {
        
        // Эффект при наведении
        readMoreButton.addEventListener('mouseenter', () => {
            readMoreButton.style.backgroundColor = '#c4b47c';
            readMoreButton.style.transform = 'scale(1.02)';
            readMoreButton.style.boxShadow = '0px 6px 20px 2px rgba(0,0,0,0.3)';
        });
        
        readMoreButton.addEventListener('mouseleave', () => {
            readMoreButton.style.backgroundColor = '#DFD09F';
            readMoreButton.style.transform = 'scale(1)';
            readMoreButton.style.boxShadow = '0px 4px 15px 2px #313131';
        });
        
        // Функция плавной прокрутки к paragraph3
        if (targetElement) {
            readMoreButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Получаем позицию целевого элемента
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000; // Длительность анимации в миллисекундах
                let startTime = null;
                
                // Функция плавной анимации
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                // Функция easing для плавности
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                // Запускаем анимацию
                requestAnimationFrame(animation);
                
                // Дополнительно: подсветка целевого элемента
                if (targetElement) {
                    targetElement.style.transition = 'all 0.5s ease';
                    setTimeout(() => {
                        targetElement.style.textShadow = 'none';
                    }, 1500);
                }
            });
        } else {
            console.warn('Элемент .paragraph3 не найден на странице');
            // Если элемент не найден, показываем уведомление при клике
            readMoreButton.addEventListener('click', () => {
                showNotification('Раздел с документами временно недоступен', false);
            });
        }
    }
    // КНОПКА ПЕРЕНАПРАВЛЕНИЯ НА ЭТУ ЖЕ СТРАНИЦУ (square8)
    const redirectLogo = document.querySelector('.square8');
        redirectLogo.addEventListener('click', (e) => {
            window.location.href = window.location.pathname; // Перенаправление на эту же страницу
        });

    const enterbutton = document.querySelector('.square10');
        enterbutton.addEventListener('click', () => {
            window.location.href = 'perehod.html';
        });
        enterbutton.addEventListener('mouseenter', () => {
            enterbutton.style.backgroundColor = '#444444';
            enterbutton.style.transform = 'scale(1)';
            enterbutton.style.boxShadow = '0px 4px 10px 1px #313131';
            enterbutton.style.border = '2px solid #fff';
        });
        enterbutton.addEventListener('mouseleave', () => {
            enterbutton.style.backgroundColor = 'transparent';
            enterbutton.style.boxShadow = '0px 0px 0px 0px #000';
            enterbutton.style.border = '1px solid #fff';
        });

    const optbutton1 = document.querySelector('.option1');
        optbutton1.addEventListener('click', () => {
            window.location.href = 'arch-page1.html';
        });

    const recombutton = document.querySelector('.square15');

    const recompanel = document.querySelector('.square16');


