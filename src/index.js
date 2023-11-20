const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rotasUser = require("./routes/user");
const rotasProblem = require("./routes/problem");
const rotasSolution = require("./routes/solution");

const app = express();

app.use(express.json());
app.use(cors());

app.use(rotasUser);
app.use(rotasProblem);
app.use(rotasSolution);

app.listen(8000, () => console.log("Servidor iniciado"));
