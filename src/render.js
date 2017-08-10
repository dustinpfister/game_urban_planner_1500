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
            mouseX_temp = -1,
            mouseY_temp = -1,
            mouseDown = false,

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

            // mouse move
            canvas.addEventListener('mousemove', function (e) {

                let bx = e.target.getBoundingClientRect();

                mouseX = e.clientX - bx.left,
                mouseY = e.clientY - bx.top;

                if (mouseX_temp !== -1 && mouseY_temp !== -1) {

                    let deltaVX = Math.round((mouseX - mouseX_temp) / cellSize),
                    deltaVY = Math.round((mouseY - mouseY_temp) / cellSize),

                    // grab a fresh ref to city.
                    city = Game.getCity();

                    vx += deltaVX;
                    vy += deltaVY;

                    if (vx < 0) {

                        vx = 0;

                    }

                    if (vx > city.map.w - vw) {

                        vx = city.map.w - vw;

                    }

                    if (vy < 0) {

                        vy = 0;

                    }

                    if (vy > city.map.h - vh) {

                        vy = city.map.h - vh;

                    }

                }

            });

            // mouse down
            canvas.addEventListener('mousedown', function (e) {

                let bx = e.target.getBoundingClientRect();

                mouseX_temp = e.clientX - bx.left,
                mouseY_temp = e.clientY - bx.top;

                mouseDown = true;

            });

            // mouse up
            canvas.addEventListener('mouseup', function (e) {

                mouseX_temp = -1;
                mouseY_temp = -1;

                mouseDown = false;

            });

            return function () {

                let city = Game.getCity(),
                mapSec = city.map.getLayerSection(0, vx, vy, vx + vw, vy + vh);

                cls();

                // render current map section
                mapSec.forEach(function (cell) {

                    ctx.fillStyle = cell.color;

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
                ctx.fillStyle = '#00ff00';
                ctx.fillText('Mouse pos: (' + mouseX + ',' + mouseY + ')', tx, 20);
                ctx.fillText('Mouse pos (temp): (' + mouseX_temp + ',' + mouseY_temp + ')', tx, 40);
                ctx.fillText('Map pos: (' + mapX + ',' + mapY + ')', tx, 60);
                ctx.fillText('Mouse down: ' + mouseDown, tx, 80);

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
