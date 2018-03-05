import * as Sequelize from 'sequelize';

import { ModelsInteface } from './ModelsInterface';

export interface DBConnectionInterface extends ModelsInteface {

    sequelize: Sequelize.Sequelize;

}
