import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum UserRole {
  ADMIN = 'admin',
  RESTAURATEUR = 'restaurateur',
  UTILISATEUR = 'utilisateur',
}

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: UserRole;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.UTILISATEUR,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;