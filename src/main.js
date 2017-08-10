/*

Main State machine, and game loop

 */

let Main = (function () {

    let currentState = 'start',

    states = {

        start : function () {

            Game.newCity();
            currentState = 'game';

        },
        game : function () {}

    },

    loop = function () {

        requestAnimationFrame(loop);

        states[currentState]();

        Render.drawState(currentState);

    };

    // hold on to your butts
    loop();

    let api = {};

    // return the public api
    return api;

}
    ());
