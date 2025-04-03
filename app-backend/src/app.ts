import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
// import restaurantRoutes from '../src/routes/restaurant.routes';

dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données
connectDB();

// Montage des routes
// app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
