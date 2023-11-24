const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "API Crowdfunding",
    description: "Documentação da API para o projeto Crowdfunding",
    contact: { email: "balicoelho@gmail.com" },
  },
  servers: [
    {
      url: "http://localhost/8000",
      description: "api de teste",
    },
    {
      url: "https://api-crowdfunding.vercel.app/",
      description: "api de produção",
    },
  ],
  tags: [],
  components: {},
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/*.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require("./src");
});
