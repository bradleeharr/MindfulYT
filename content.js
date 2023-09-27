
function randomPopupTrigger() {
    let maxTime = 4000;
    let minTime = 1000;
    let randomTime = Math.random() * (maxTime - minTime) + minTime;
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

randomPopupTrigger();




