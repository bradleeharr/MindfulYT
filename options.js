const MIN_TO_S = 60;
const S_TO_MS = 1000;
// When the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load existing config
    chrome.storage.sync.get(['minTime', 'maxTime'], (result) => {
        document.getElementById('minTime').value = result.minTime || '';
        document.getElementById('maxTime').value = result.maxTime || '';
    });

    // Save button listener
    document.getElementById('save').addEventListener('click', () => {
        let minTime_m = parseInt(document.getElementById('minTime-m').value);
        let minTime_s = parseInt(document.getElementById('minTime-s').value);

        let maxTime_m = parseInt(document.getElementById('maxTime-m').value);
        let maxTime_s = parseInt(document.getElementById('maxTime-s').value);
        
        let minTime = parseInt((minTime_m*MIN_TO_S + minTime_s)*S_TO_MS) || 10*S_TO_MS;
        let maxTime = parseInt((maxTime_m*MIN_TO_S + maxTime_s)*S_TO_MS) || 300*S_TO_MS;

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
