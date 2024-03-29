const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
}).catch(error => console.error(error));
