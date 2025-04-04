// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// Interface pour étendre l'objet Request
interface AuthRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    email: string;
    role: string;
  };
}

// Interface pour le payload du token JWT
interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

/**
 * Middleware d'authentification qui vérifie la validité du token JWT
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Transformation de l'ID string en ObjectId pour MongoDB
    req.user = {
      _id: new Types.ObjectId(decoded._id),
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * Middleware pour autoriser uniquement les administrateurs
 */
export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
}

/**
 * Middleware pour autoriser uniquement les restaurateurs et les administrateurs
 */
export function authorizeRestaurateur(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user || (req.user.role !== 'restaurateur' && req.user.role !== 'admin')) {
    res.status(403).json({ error: 'Restaurateur access required' });
    return;
  }
  next();
}

/**
 * Middleware pour autoriser uniquement les utilisateurs normaux
 */
export function authorizeUser(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
}

// Exporter un middleware combiné pour les cas d'utilisation courants
export const authMiddleware = {
  authenticate,
  authorizeAdmin,
  authorizeRestaurateur,
  authorizeUser
};