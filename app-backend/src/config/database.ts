
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/monrestodb');
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
