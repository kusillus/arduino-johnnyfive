const five = require("johnny-five");
const board = new five.Board({
    "port": "COM3"
});

/*
    Example img
    http://johnny-five.io/img/breadboard/led-fade-callback.png
*/


board.on("ready", function() {
    const leds = new five.Leds([11,10,9]);
    const ledCount = leds.length;
    const timing = 400;
    var fadeIndex = 0;
    

    function fadeNext() {
        var candidateIndex = fadeIndex;
        leds[fadeIndex].fadeIn(timing);
        while (candidateIndex === fadeIndex) {            
            candidateIndex = Math.round(Math.random() * (ledCount - 1));
            console.log('Number of led: '+leds[candidateIndex].pin);
        }
        fadeIndex = candidateIndex;
        leds[fadeIndex].fadeOut(timing, fadeNext);
    }
    leds.on();
    leds[fadeIndex].fadeOut(timing, fadeNext);
});
