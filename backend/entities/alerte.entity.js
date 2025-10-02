// src/entities/alerte.entity.js
const { EntitySchema } = require('typeorm');

class Alerte {}

const AlerteSchema = new EntitySchema({
  name: 'Alerte',
  tableName: 'alertes',
  target: Alerte,
  columns: {
    id:             { type: 'bigint', primary: true, generated: 'increment' },
    type:           { type: 'varchar', length: 100, nullable: false },
    data:           { type: 'jsonb', nullable: true },
    maisonId:       { name: 'maison_id', type: 'bigint', nullable: true },
    sendToOperator: { type: 'boolean', default: false },
    sentToPolice:   { type: 'boolean', default: false },
    created_at:     { type: 'timestamptz', createDate: true, default: () => 'NOW()' },
    updated_at:     { type: 'timestamptz', updateDate: true,  default: () => 'NOW()' },
  },
  indices: [
    { name: 'alertes_sent_to_police_idx',   columns: ['sentToPolice'] },
    { name: 'alertes_send_to_operator_idx', columns: ['sendToOperator'] },
  ],
  // relations: { maison: { type: 'many-to-one', target: 'Maison', joinColumn: { name: 'maison_id' } } }
});

module.exports = { Alerte, AlerteSchema };
