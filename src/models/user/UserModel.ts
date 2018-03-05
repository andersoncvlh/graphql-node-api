import * as Sequelize from 'sequelize';

import { UserInstance } from './UserInstance';
import { BaseMoldeInterface } from './../../interfaces/BaseMoldeInterface';
import { UserAttributes } from './UserAttributes';

export interface UserModel extends BaseMoldeInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): UserModel => {

    const user: UserModel = sequelize.define<UserInstance, UserAttributes>('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false,
            unique: true
        }, password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 8
            }
        },
        photo: {
            type: dataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        }
    });

    return user;
}
