const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

// for parsing application/json
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/event", require("./routes/event.routes"));


const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App hes been started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.massage);
    process.exit(1);
  }
}

start();