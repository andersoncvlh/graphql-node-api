import * as Sequelize from "sequelize";

import { UserAttributes } from './UserAttributes';

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

    isPassword(encodedPassword: string, password): boolean;

}
