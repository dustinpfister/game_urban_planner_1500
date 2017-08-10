/*

The main game module

 */

let Game = (function () {

    let city = {},

    api = {

        // start a new city, destroying any currently loaded city.
        newCity : function () {

            console.log('strting new city!');

            city.map = new Stack({
                    w : 32,
                    h : 32,
                    d : 1
                });

            // for all points
            city.map.points.forEach(function (pt) {

                let v = Math.floor(Math.random() * 200) + 55;

                pt.color = 'rgba(' + v + ',' + v + ',' + v + ',1)'

            });

        },

        // just return a reference to the current city object
        getCity : function () {

            return city;

        }

    };

    // return the public api
    return api;

}
    ());
