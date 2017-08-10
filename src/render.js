/*

Renders a game view to the canvas

 */

let Render = (function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // append to body
    document.body.appendChild(canvas);

    // set actual matrix size of the canvas
    canvas.width = 320;
    canvas.height = 240;

    let cls = function () {
        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    states = {

        game : function () {

            var city = Game.getCity(),
            vx = 1, // view cell x,y,w,h (when getting stack data)
            vy = 1,
            vw = 8,
            vh = 6,
            cellSize = 32,
            mapSec = city.map.getLayerSection(0, vx, vy, vx + vw, vy + vh);

            cls();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('game state: ', 10, 10);

            // render curent map section

            mapSec.forEach(function (cell) {

                ctx.fillRect((cell.x - vx) * cellSize + 16, (cell.y-vy) * cellSize + 20, cellSize, cellSize);

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
