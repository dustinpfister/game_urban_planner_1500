/*

 * Renders a game view to the canvas
 * Also contains my event handers.

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

        game : (function () {

            let mouseX = 0, // mouse
            mouseY = 0,

            mapX = 0, // map
            mapY = 0,
            mapOffsetX = 15,
            mapOffsetY = 20,

            // stack_3 view cell x,y,w,h (when getting stack data)
            vx = 0,
            vy = 0,
            vw = 14,
            vh = 11,

            cellSize = 32;

            // events for game render state.
            canvas.addEventListener('mousemove', function (e) {

                var bx = e.target.getBoundingClientRect();

                mouseX = e.clientX - bx.left,
                mouseY = e.clientY - bx.top;

            });

            return function () {

                let city = Game.getCity(),
                mapSec = city.map.getLayerSection(0, vx, vy, vx + vw, vy + vh);

                cls();
                ctx.fillStyle = '#ffffff';

                // render current map section
                mapSec.forEach(function (cell) {

                    let x = cell.x - vx,
                    y = cell.y - vy;

                    ctx.fillRect(
                        x * cellSize + mapOffsetX,
                        y * cellSize + mapOffsetY,
                        cellSize - 1,
                        cellSize - 1);

                });

                // render info
                let tx = 16 + cellSize * vw + 10; // text x
                ctx.textBaseline = 'top';
                ctx.fillText('Mouse pos: (' + mouseX + ',' + mouseY + ')', tx, 20);
                ctx.fillText('Map pos: (' + mapX + ',' + mapY + ')', tx, 40);

            };

        }
            ())

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
