import sql from 'mssql';
import { Utils } from '../../utils/utils';
import { DatabaseUtils } from '../../utils/DatabaseUtils';

export class UserDbSteps {
  static async getAllUsers() {
    const query = Utils.loadQuery('queries/users/getAllUsers.sql');
    return await DatabaseUtils.withConnection(async (pool) => {
      const result = await pool.request().query(query);
      return result.recordset;
    });
  }

  static async getUserNameById(id: number) {
    const query = Utils.loadQuery('queries/users/getUserNameById.sql');
    return await DatabaseUtils.withConnection(async (pool) => {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(query);
      return result.recordset[0]?.FirstName;
    });
  }

  static async updateSecondUserFirstName(newName: string) {
    const query = Utils.loadQuery('queries/users/updateSecondUserName.sql');
    return await DatabaseUtils.withConnection(async (pool) => {
      await pool.request()
        .input('newFirstName', sql.NVarChar, newName)
        .query(query);
    });
  }
  
}
