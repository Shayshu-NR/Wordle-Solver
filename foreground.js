var evaluations = {}

var checkExist = setInterval(function() {
    if( typeof document.querySelector('game-app') != 'undefined'){
        console.log("EXISTS:", document.querySelector('game-app').shadowRoot.childNodes[3].children[0].children[1].children[0].children)

        var rows = document.querySelector('game-app').shadowRoot.childNodes[3].children[0].children[1].children[0].children;
        
        for(let r of rows) {
            let count = 0;
            for(let t of r.shadowRoot.children[1].children) {
                if(t.getAttribute('letter') != null) {
                    evaluations[t.getAttribute('letter')] = [t.getAttribute('evaluation'), count]
                    count++;
                }
            }
        }

        console.log(evaluations)
        
        chrome.runtime.sendMessage({
            message : "evaluations",
            payload : evaluations
        }, response => {
            console.log(response)
            clearInterval(checkExist);
        });
    }
    else {
        console.log(document.querySelector('game-app'))
    }
}, 100);

