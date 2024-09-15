
function randomPopupTrigger() {
    let randomTime = Math.random() * (window.config.maxTime - window.config.minTime) + window.config.minTime;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * window.messagesList.length);
        window.showOverlay(window.messagesList[randomIndex]); 
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

function blockShorts() {
    queries = ["#shorts-container", 
        "#dismissible.style-scope.ytd-rich-shelf-renderer",
        "div#dismissible.style-scope.ytd-rich-shelf-renderer"
        
        ];

    for (const query of queries) {
        const items = document.querySelectorAll(query);
        items.forEach(item => {
            console.log("Removed ", item);
            item.remove();
            });
        }
}    


    console.log("Content Loaded");

    
    chrome.storage.sync.get({ blockShortsSet: true }, (result) => {
        const isBlockShortsSet = result.blockShortsSet;
        console.log("Block Shorts is ", isBlockShortsSet);

        if (isBlockShortsSet) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(() => {                
                    if (isBlockShortsSet) {
                        blockShorts();
                    }
                });
            });            
            observer.observe(document.body, { childList: true, subtree: true });

        }
    });

    blockShorts(); 
        
    if (window.location.pathname.includes("/watch")) {
        var channelNameInterval = setInterval(checkForChannelName, 1000);  // Check every second
    }

    chrome.storage.sync.get(['minTime', 'maxTime'], (result) => {
        window.config = {
            minTime: result.minTime || 60000,  // default to 60 seconds if not set
            maxTime: result.maxTime || 300000  // default to 5 minutes if not set
        };
        randomPopupTrigger();
    });