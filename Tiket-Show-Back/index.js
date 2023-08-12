//const { searchresults } = require('./src/utils/index.js');
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const {
  loadEvents,
  loadPlaces,
  loadArtists,
  loadGenres,
  loadUsers,
  loadCitys,
  loadDate
} = require("./src/controllers/loadsDatabase.js");

const port = process.env.PORT || 3001;
// Syncing all the models at once
conn.sync({ force: false}).then(async () => {
  loadUsers();
  loadEvents();
  loadArtists();
  loadPlaces();
  loadGenres();
  loadCitys();
  loadDate();
  server.listen(port, () => {
    console.log(`servidor corriendo en puerto: ${port}`); // eslint-disable-line no-console
  });

});
