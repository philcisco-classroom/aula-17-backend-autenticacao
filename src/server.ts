import { app } from "./app.js";

const port : number = 3001;

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`);
});
