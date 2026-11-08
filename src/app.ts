import express from 'express'
import cors from 'cors'
import { filmeRoutes } from './routes/filme.routes.js';
import {authRoutes} from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
})); //Cors um pouco mais seguro do que fizemos em aula. Especifiquei o domínio do Next "localhost:3000"

app.use(cookieParser()); //O token JWT fica salvo no cookie, e a lib cookieParser permite fazer a manipulação
app.use('/filmes',filmeRoutes);
app.use('/auth',authRoutes);

export {app};