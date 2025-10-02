// src/entities/user.entity.js
const { EntitySchema } = require('typeorm');
const bcrypt = require('bcryptjs');

class User {
  comparePassword(plain) {
    if (!this.password) return Promise.resolve(false);
    return bcrypt.compare(plain, this.password);
  }
}

const UserSchema = new EntitySchema({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id:         { type: 'bigint', primary: true, generated: 'increment' },
    nom:        { type: 'varchar', length: 255, nullable: false },
    email:      { type: 'varchar', length: 255, nullable: false, unique: true },
    password:   { type: 'varchar', length: 255, nullable: true, select: false },
    role:       { type: 'enum', enumName: 'user_role', enum: ['admin','citoyen','policier','analyste'], nullable: false, default: 'citoyen' },
    created_at: { type: 'timestamptz', createDate: true, default: () => 'NOW()' },
    updated_at: { type: 'timestamptz', updateDate: true,  default: () => 'NOW()' },
  },
  indices: [
    { name: 'users_email_unique', columns: ['email'], unique: true },
  ],
});

module.exports = { User, UserSchema };
