
function randomPopupTrigger() {
    let randomTime = Math.random() * (window.config.maxTime - window.config.minTime) + window.config.minTime;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * window.messagesList.length);
        window.showOverlay(window.messagesList[randomIndex]); 
        randomPopupTrigger(); 
    }, randomTime);
}


function checkForChannelName() {
    let channelElement = document.querySelector("a.yt-simple-endpoint.style-scope.yt-formatted-string");
    if (channelElement) {
        let channelName = channelElement.textContent;
        console.log("Channel Name:", channelName);
        clearInterval(channelNameInterval);  // Clear the interval once the element is found
    }
}

if (window.location.pathname.includes("/watch")) {
    var channelNameInterval = setInterval(checkForChannelName, 1000);  // Check every second
}

chrome.storage.sync.get(['minTime', 'maxTime'], (result) => {
    window.config = {
        minTime: result.minTime || 10000,  // default to 10 seconds if not set
        maxTime: result.maxTime || 300000  // default to 5 minutes if not set
    };
    randomPopupTrigger();
});




