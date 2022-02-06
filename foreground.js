var evaluations = {}
var tryCounter = 0;

var checkExist = setInterval(function () {
    try {

        if (tryCounter > 100 && typeof document.querySelector('game-app') != 'undefined') {
            console.log("EXISTS:", document.querySelector('game-app').shadowRoot.childNodes[3].children[0].children[1].children[0].children)

            var rows = document.querySelector('game-app').shadowRoot.childNodes[3].children[0].children[1].children[0].children;

            for (let r of rows) {
                let count = 0;
                for (let t of r.shadowRoot.children[1].children) {
                    if (t.getAttribute('letter') != null) {
                        evaluations[t.getAttribute('letter')] = [t.getAttribute('evaluation'), count]
                        count++;
                    }
                }
            }
            console.log(evaluations);
            clearInterval(checkExist)
        }
        else {
            console.log("clear")
            tryCounter++;
        }
    }
    catch {
        console.log("caught")
        tryCounter++;
    }
}, 100);

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        chrome.runtime.sendMessage({
            message: "evaluations",
            payload: evaluations
        }, (response) => {
            console.log(response)
        });
    }
});



