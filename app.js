import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { router as cartsRouter } from './routes/cart.router.js';
import { router as productsRouter } from './routes/products.router.js';
import { router as handlebarsRouter } from './routes/handlebars.Router.js';
import socketioRouter from './routes/socketio.Router.js';
import {engine} from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';


const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/', handlebarsRouter);

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/socketio', socketioRouter(io));

server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect('mongodb+srv://rocconesci344:344a2344@rocco-nesci-backend.atqrp5y.mongodb.net/?retryWrites=true&w=majority&appName=Rocco-nesci-backend');
    console.log(`Conexión a DB establecida`);
} catch (error) {
    console.log("Error DB. " + error.message);
}


