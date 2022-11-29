import { app } from "./app";
import datasource from "./orm/datasource";

const PORT = 8000;

datasource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`servidor rodando na porta ${PORT}`);
    });
  });
