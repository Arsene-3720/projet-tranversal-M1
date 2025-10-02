// src/entities/typeIncident.entity.js
const { EntitySchema } = require('typeorm');

const TypeIncidentSchema = new EntitySchema({
  name: 'TypeIncident',
  tableName: 'type_incident',
  columns: {
    id:         { type: 'bigint', primary: true, generated: 'increment' },
    libelle:    { type: 'varchar', length: 150, unique: true, nullable: false },
    description:{ type: 'varchar', length: 1000, nullable: true },
    created_at: { type: 'timestamptz', createDate: true, default: () => 'NOW()' },
    updated_at: { type: 'timestamptz', updateDate: true,  default: () => 'NOW()' },
  },
});

module.exports = { TypeIncidentSchema };
