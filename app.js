const express = require("express");
const playlistRouter = require("./src/router/playlistRouter");

const app = express();
app.use(express.json());
app.use(playlistRouter);
require("./swagger")(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
