/*

Renders a game view to the canvas

 */

let Render = (function () {

    // create and inject a canvas
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // append to body
    document.body.appendChild(canvas);

    // set actual matrix size of the canvas
    canvas.width = 640;
    canvas.height = 480;

    let cls = function () {
        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    states = {

        game : function () {

            let city = Game.getCity(),
            vx = 1, // view cell x,y,w,h (when getting stack data)
            vy = 1,
            vw = 14,
            vh = 11,
            cellSize = 32,
            mapSec = city.map.getLayerSection(0, vx, vy, vx + vw, vy + vh);

            cls();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('game state: ', 10, 10);

            // render current map section
            mapSec.forEach(function (cell) {

                let x = cell.x - vx,
                y = cell.y - vy;

                ctx.fillRect(
                    x * cellSize + 16,
                    y * cellSize + 20,
                    cellSize-1,
                    cellSize-1);

            });

        }

    };

    cls();

    let api = {

        // render the given state to the context
        drawState : function (state) {

            states[state]();

        }

    };

    // return the public api
    return api;

}
    ());
