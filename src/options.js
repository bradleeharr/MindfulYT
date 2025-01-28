// options.js

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load existing config
  chrome.storage.sync.get(
    [
      "minTime_m",
      "minTime_s",
      "maxTime_m",
      "maxTime_s",
      "blockShortsSet",
      "newBlacklistedChannel",
      "blacklistedChannels",
    ],
    (result) => {
      console.log(result);
      document.getElementById("minTime-m").value = result.minTime_m || "";
      document.getElementById("minTime-s").value = result.minTime_s || "";
      document.getElementById("maxTime-m").value = result.maxTime_m || "";
      document.getElementById("maxTime-s").value = result.maxTime_s || "";

      let blacklist = document.getElementById("blacklist");

      console.log(result.blacklistedChannels);

      if (result.blacklistedChannels) {
        result.blacklistedChannels.forEach((channelName) => {
          const listItem = document.createElement("div");
          listItem.className = "blacklist-item";
          listItem.textContent = channelName;
          blacklist.appendChild(listItem);
        });
      }
    },
  );

  // Save button listener
  document.getElementById("save").addEventListener("click", () => {
    let minTime_m = parseInt(document.getElementById("minTime-m").value);
    let minTime_s = parseInt(document.getElementById("minTime-s").value);
    let maxTime_m = parseInt(document.getElementById("maxTime-m").value);
    let maxTime_s = parseInt(document.getElementById("maxTime-s").value);
    let blockShortsSet = document.getElementById("blockShortsSet").checked;
    let newBlacklistedChannel = document.getElementById(
      "newBlacklistedChannel",
    ).value;

    // Handle the list of blacklisted channels. We have to first get from chrome storage
    // to then update
    chrome.storage.sync.get(["blacklistedChannels"], (result) => {
      let blacklistedChannels = result.blacklistedChannels || [];

      console.log("newBlackListedChannel: ", newBlacklistedChannel);
      console.log("blacklistedChannels: ", blacklistedChannels);
      blacklistedChannels.push(newBlacklistedChannel);

      // Save the configuration
      chrome.storage.sync.set({
        minTime_m,
        minTime_s,
        maxTime_m,
        maxTime_s,
        blockShortsSet,
        blacklistedChannels,
      });
    });

    // Show feedback message
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = "Settings saved!";
    feedbackElement.style.display = "inline";

    // Hide feedback message after 3 seconds
    setTimeout(() => {
      feedbackElement.style.display = "none";
    }, Constants.FEEDBACK_MESSAGE_TIMEOUT);
  });
});
