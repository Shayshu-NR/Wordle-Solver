let latestGuess;

document.addEventListener("DOMContentLoaded", function () {
  $(".btn").on("click", function () {
    // Send a message to the foreground to get all the board data...
    chrome.runtime.sendMessage(
      {
        message: "getlatestguess",
      },
      function (response) {
        console.log(response);
        return Promise.resolve("");
      }
    );
  });
});
