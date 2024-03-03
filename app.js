import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { router as cartsRouter } from './routes/cart.router.js';
import { router as productsRouter } from './routes/products.router.js';
import { router as handlebarsRouter } from './routes/handlebars.Router.js';
import socketioRouter from './routes/socketio.Router.js';
import exphbs from 'express-handlebars';

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el motor de plantillas Handlebars
app.set('view engine', 'handlebars');

// Montar routers
app.use('/', handlebarsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/socketio', socketioRouter(io));

server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

