import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true })); // Corrección aquí (extended: true)

// Habilitar cookie Parser
app.use(cookieParser());

// Habilitar csurf
app.use(csurf({ cookie: true }));

// Conexión a la bd
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion a la bd exitosa!!!');
} catch (error) {
    console.log(error);
}

// Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta pública
app.use(express.static('public'));

// Rutas
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);

// Definir un puerto y arrancar el proyecto
const PORT = process.env.PORT || 3000; // Cambiar el puerto a 3001 u otro si 3000 está en uso
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
