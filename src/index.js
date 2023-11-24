const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const rotasUser = require("./routes/user");
const rotasProblem = require("./routes/problem");
const rotasSolution = require("./routes/solution");
const swaggerFile = require("../swagger-output.json");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL })
);
app.use(rotasUser);
app.use(rotasProblem);
app.use(rotasSolution);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
