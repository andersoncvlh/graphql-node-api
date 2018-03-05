import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

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
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: (userInstance: UserInstance, options: Sequelize.CreateOptions): void => {
                const salt = genSaltSync();
                userInstance.password = hashSync(userInstance.password, salt);
            }
        }
    });

    user.prototype.isPassword = (encodedPassword: string, password): boolean => {
        return compareSync(password, encodedPassword);
    }

    return user;
}
