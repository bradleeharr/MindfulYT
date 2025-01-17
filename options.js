// options.js

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load existing config
    chrome.storage.sync.get(['minTime_m', 'minTime_s', 'maxTime_m', 'maxTime_s'], (result) => {
        console.log(result)
        document.getElementById('minTime-m').value = result.minTime_m || '';
        document.getElementById('minTime-s').value = result.minTime_s || '';

        document.getElementById('maxTime-m').value = result.maxTime_m || '';
        document.getElementById('maxTime-s').value = result.maxTime_s || '';
    });

    // Save button listener
    document.getElementById('save').addEventListener('click', () => {
        let minTime_m = parseInt(document.getElementById('minTime-m').value);
        let minTime_s = parseInt(document.getElementById('minTime-s').value);

        let maxTime_m = parseInt(document.getElementById('maxTime-m').value);
        let maxTime_s = parseInt(document.getElementById('maxTime-s').value);
        let blockShortsSet = document.getElementById('blockShortsSet').checked;

        // Save the configuration
        chrome.storage.sync.set({minTime_m, minTime_s, maxTime_m, maxTime_s, blockShortsSet}, () => {
            console.log('Configuration saved');
            console.log(blockShortsSet);
        });


         // Show feedback message
         const feedbackElement = document.getElementById('feedback');
         feedbackElement.textContent = 'Settings saved!';
         feedbackElement.style.display = 'inline';
 
         // Hide feedback message after 3 seconds
         setTimeout(() => {
             feedbackElement.style.display = 'none';
         }, Constants.FEEDBACK_MESSAGE_TIMEOUT);
    });
});
