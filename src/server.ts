import { init } from "./app";

const PORT = 8000;

init().then((app) => {
  app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
  });
});
