export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "미니프로젝트 API - DOCS",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
