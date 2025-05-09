import sql from 'mssql';
import { envConfig } from '../../configs/env';

export class DatabaseUtils {
  static async withConnection<T>(callback: (pool: sql.ConnectionPool) => Promise<T>): Promise<T> {
    const pool = await sql.connect(envConfig.dbConfig);
    try {
      return await callback(pool);
    } finally {
      await pool.close();
    }
  }
}
