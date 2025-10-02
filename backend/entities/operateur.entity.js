// src/entities/operateur.entity.js
const { EntitySchema } = require('typeorm');

class Operateur {
  qualifierIncident(incidentId) {
    this.last_action = `qualifier:${incidentId}`;
    return `Incident ${incidentId} qualifié`;
  }
  assignerUnite(uniteId) {
    this.last_action = `assigner_unite:${uniteId}`;
    return `Unité ${uniteId} assignée`;
  }
}

const OperateurSchema = new EntitySchema({
  name: 'Operateur',
  tableName: 'operateurs',
  target: Operateur,
  columns: {
    id:          { type: 'bigint', primary: true, generated: 'increment' },
    phone:       { type: 'varchar', length: 30, nullable: true },
    grade:       { type: 'varchar', length: 100, nullable: true },
    active:      { type: 'boolean', default: true },
    last_action: { type: 'text', nullable: true },
    created_at:  { type: 'timestamptz', createDate: true, default: () => 'NOW()' },
    updated_at:  { type: 'timestamptz', updateDate: true, default: () => 'NOW()' },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',                                // lié à users.id
      joinColumn: { name: 'user_id', referencedColumnName: 'id' },
      nullable: false,
      onDelete: 'CASCADE',
      eager: true,
    },
  },
  indices: [
    { name: 'operateurs_user_id_unique', columns: ['user_id'], unique: true },
    { name: 'operateurs_active_idx',     columns: ['active'] },
  ],
});

module.exports = { Operateur, OperateurSchema };
