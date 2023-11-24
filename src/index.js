const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();
const rotasUser = require("./routes/user");
const rotasProblem = require("./routes/problem");
const rotasSolution = require("./routes/solution");
const swaggerFile = require("../swagger-output.json");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(rotasUser);
app.use(rotasProblem);
app.use(rotasSolution);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
