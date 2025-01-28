// options.js

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load existing config
  chrome.storage.sync.get(
    ["minTime_m", "minTime_s", "maxTime_m", "maxTime_s", "blackList"],
    (result) => {
      console.log(result);
      document.getElementById("minTime-m").value = result.minTime_m || "";
      document.getElementById("minTime-s").value = result.minTime_s || "";
      document.getElementById("maxTime-m").value = result.maxTime_m || "";
      document.getElementById("maxTime-s").value = result.maxTime_s || "";
      document.getElementById("blacklisted").textContent =
        result.blackListedChannels;
    },
  );

  // Save button listener
  document.getElementById("save").addEventListener("click", () => {
    let minTime_m = parseInt(document.getElementById("minTime-m").value);
    let minTime_s = parseInt(document.getElementById("minTime-s").value);
    let maxTime_m = parseInt(document.getElementById("maxTime-m").value);
    let maxTime_s = parseInt(document.getElementById("maxTime-s").value);
    let blockShortsSet = document.getElementById("blockShortsSet").checked;
    let newBlackListedChannel = document.getElementById(
      "newBlacklistedChannel",
    ).value;

    // Handle the list of blacklisted channels. We have to first get from chrome storage
    // to then update
    let blackListedChannels = [];
    chrome.storage.sync.get(["blackListedChannels"], (result) => {
      blackListedChannels = result.blackListedChannels;
      blackListedChannels.push(newBlackListedChannel);

      // Save the configuration
      chrome.storage.sync.set(
        {
          minTime_m,
          minTime_s,
          maxTime_m,
          maxTime_s,
          blockShortsSet,
          blackListedChannels,
        },
        () => {
          console.log("Blacklisted Channels: ", blackListedChannels);
          console.log("Configuration saved");
        },
      );
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
