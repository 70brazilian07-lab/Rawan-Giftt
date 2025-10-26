document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const heartSymbols = ['💞', '❤️', '🤍', '💖', '✨', '⭐', '💫', '🌠', '🌌'];
    const numHearts = 70;
    const warmthButton = document.getElementById('warmth-button');
    const body = document.body;

    // الحصول على عناصر الرسالة السرية لعرضها
    const secretMessageDiv = document.getElementById('secret-message');
    const secretMessageP = secretMessageDiv ? secretMessageDiv.querySelector('p') : null;
    
    // قائمة الرسائل القصيرة والعميقة
    const secretMessages = [
        "Just passing by to say hi. 👋",
        "Hope you are having a great day 😊",
        "Came across something cool and thought of you.",
        "Hope everything goes well today. 👍",
        "You look like the moon in its fullness. 🌙",
        "Your eyes hold a strange, unforgettable magic. ✨"
    ];

    // ----------------- وظيفة القلوب الطائرة -----------------
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart', 'floating-heart');
        
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.textContent = symbol;
        
        const left = Math.random() * 100; 
        const initialTop = 100 + Math.random() * 10; 

        heart.style.left = `${left}vw`; 
        heart.style.top = `${initialTop}vh`;
        heart.style.animationDuration = `${Math.random() * 10 + 10}s`; 
        heart.style.animationDelay = `-${Math.random() * 15}s`; 

        heart.addEventListener('click', (event) => {
            heart.classList.add('popped');
            setTimeout(() => {
                heart.remove();
                heartContainer.appendChild(createHeart()); 
            }, 500); 
            event.stopPropagation(); 
        });

        return heart;
    }

    if (heartContainer) {
        for (let i = 0; i < numHearts; i++) {
            heartContainer.appendChild(createHeart());
        }
    }

    // ----------------- وظيفة الزر: عرض رسالة عشوائية -----------------
    if (warmthButton && secretMessageDiv && secretMessageP) {
        warmthButton.addEventListener('click', () => {
            if (warmthButton.classList.contains('active-cooldown')) {
                return;
            }

            // 1. تفعيل وضع التبريد
            warmthButton.classList.add('active-cooldown');
            const originalText = warmthButton.innerHTML;
            warmthButton.innerHTML = '<i class="fas fa-magic"></i> Message Displayed!';
            
            // 2. إزالة تأثير الخلفية الكوني
            body.classList.remove('cosmic-active');
            
            // 3. اختيار رسالة عشوائية وعرضها
            const message = secretMessages[Math.floor(Math.random() * secretMessages.length)];
            secretMessageP.textContent = message;
            secretMessageDiv.classList.add('show');
            
            // 4. إيقاف التفعيل وإخفاء الرسالة بعد 3 ثوانٍ
            setTimeout(() => {
                secretMessageDiv.classList.remove('show');
                
                // 5. إعادة ضبط الزر بعد فترة قصيرة
                setTimeout(() => {
                    warmthButton.classList.remove('active-cooldown');
                    warmthButton.innerHTML = originalText;
                }, 500); 

            }, 3000); // عرض الرسالة لمدة 3 ثوانٍ
        });
    }
});


// ----------------- وظيفة النجوم لخلفية صفحة الرسالة (تعمل عند تحميل الصفحة) -----------------
window.addEventListener('load', () => {
    const starContainer = document.getElementById('star-background-container');
    if (!starContainer) return;

    const numStars = 100;
    const starSymbols = ['•', '°', '.', '⭐'];

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('message-star');
        
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        
        // مواقع وحجم عشوائي
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.fontSize = `${Math.random() * 0.5 + 0.3}em`;
        star.style.animationDelay = `-${Math.random() * 5}s`; // لتكون متحركة من البداية

        starContainer.appendChild(star);
    }
});