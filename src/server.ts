import dotenv = require("dotenv");
dotenv.config();

import { app } from "./app";

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
