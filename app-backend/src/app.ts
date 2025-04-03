import express from 'express';
import dotenv from 'dotenv';

// import restaurantRoutes from '../src/routes/restaurant.routes';

dotenv.config();

const app = express();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
