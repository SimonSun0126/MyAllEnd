import { CommonDB } from './types/func';

const DB = {
  db: undefined as CommonDB | undefined,
};

export async function initDBClass(db: CommonDB) {
  DB.db = db;
  await DB.db.open();
}

export default DB;
