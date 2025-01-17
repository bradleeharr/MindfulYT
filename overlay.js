// overlay.js

window.showOverlay = function(message) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.style.transition = 'background-color 0.5s ease-in-out'; 
    
    // Add heading to overlay
    const headingElem = document.createElement('h1');
    headingElem.textContent = 'MindfulYT'; 
    headingElem.style.fontFamily = 'Arial, sans-serif';
    headingElem.style.fontSize = '3em';
    headingElem.style.fontWeight = 'bold';
    headingElem.style.color = 'yellow'; 
    headingElem.style.textAlign = 'center';
    headingElem.style.marginBottom = '20px';
    headingElem.style.padding = '20px'; 
    overlay.appendChild(headingElem);
    
    // Add message to overlay
    const messageElem = document.createElement('p');
    messageElem.textContent = message;
    messageElem.style.fontFamily = 'Arial, sans-serif';
    messageElem.style.fontSize = '2em';
    messageElem.style.fontWeight = 'bold';
    messageElem.style.color = 'white';
    messageElem.style.textAlign = 'center';
    messageElem.style.animation = 'scrollIn 2s'; // Add animation to text

    overlay.appendChild(messageElem);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Trigger fade-in effect
    setTimeout(() => {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }, 0);

     // Add CSS for animation
     const style = document.createElement('style');
     style.innerHTML = `
         @keyframes scrollIn {
             from {
                 transform: translateY(100%);
                 opacity: 0;
             }
             to {
                 transform: translateY(0);
                 opacity: 1;
             }
         }
     `;
     document.head.appendChild(style);


    // Remove overlay on click
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
        // But add the random popup trigger again
        randomPopupTrigger();
    });

    // Pause video (if any)
    const video = document.querySelector('video');
    if (video) {
        video.pause();
    }
};