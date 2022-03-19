export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "스웩어",
      version: "10.9.9",
    },
  },
  apis: ["./swagger/*.js"], // files containing annotations as above
};
