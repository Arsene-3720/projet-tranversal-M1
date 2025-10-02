const fs = require('fs'); const path = require('path');
module.exports = class CreateUser{
  name = 'CreateUser';
  async up(qr) {
    const sql = fs.readFileSync(path.join(__dirname,'../sql/1719830000000-create-user.sql'),'utf8');
    await qr.query(sql);
  }
  async down(qr) {
    await qr.query(`DROP TRIGGER IF EXISTS trg_users_updated_at ON users;`);
    await qr.query(`DROP FUNCTION IF EXISTS set_updated_at;`);
    await qr.query(`DROP TABLE IF EXISTS users;`);
    await qr.query(`DROP TYPE IF EXISTS user_role;`);
  }
};
