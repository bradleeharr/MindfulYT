// When the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load existing config
    chrome.storage.sync.get(['minTime', 'maxTime'], (result) => {
        document.getElementById('minTime').value = result.minTime || '';
        document.getElementById('maxTime').value = result.maxTime || '';
    });

    // Save button listener
    document.getElementById('save').addEventListener('click', () => {
        let minTime = parseInt(document.getElementById('minTime').value*1000) || 10000;
        let maxTime = parseInt(document.getElementById('maxTime').value*1000) || 300000;
        // Save the configuration
        chrome.storage.sync.set({minTime, maxTime}, () => {
            console.log('Configuration saved');
        });
         // Show feedback message
         const feedbackElement = document.getElementById('feedback');
         feedbackElement.textContent = 'Settings saved!';
         feedbackElement.style.display = 'inline';
 
         // Hide feedback message after 3 seconds
         setTimeout(() => {
             feedbackElement.style.display = 'none';
         }, 3000);
    });
});
