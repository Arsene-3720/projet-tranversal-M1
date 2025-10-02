// src/entities/cartezones.entity.js
const { EntitySchema } = require('typeorm');

class CarteZones {}

const CarteZonesSchema = new EntitySchema({
  name: 'CarteZones',
  tableName: 'carte_zones',
  target: CarteZones,
  columns: {
    id:          { type: 'bigint', primary: true, generated: 'increment' },
    nom:         { type: 'varchar', length: 255, nullable: false },
    description: { type: 'text', nullable: true },
    geojson:     { type: 'jsonb', nullable: true },
    active:      { type: 'boolean', default: true },
    created_at:  { type: 'timestamptz', createDate: true, default: () => 'NOW()' },
    updated_at:  { type: 'timestamptz', updateDate: true,  default: () => 'NOW()' },
  },
  indices: [
    { name: 'carte_zones_active_idx', columns: ['active'] },
    { name: 'carte_zones_nom_idx',    columns: ['nom'] },
  ],
});

module.exports = { CarteZones, CarteZonesSchema };
