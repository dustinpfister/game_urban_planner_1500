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

            let x = 0, // the x and y map pos
            y = 0,
			
			mapOffsetX = 15,
			mapOffsetY = 20,

            vx = 0, // view cell x,y,w,h (when getting stack data)
            vy = 0,
            vw = 14,
            vh = 11,

            cellSize = 32;

            // events for game render state.
            canvas.addEventListener('mousemove', function (e) {

                var bx = e.target.getBoundingClientRect();

                x = e.clientX - bx.left,
                y = e.clientY - bx.top;

                console.log(x + ',' + y);

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
                ctx.fillText('Map pos: (' + x + ',' + y + ')', tx, 20);

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
