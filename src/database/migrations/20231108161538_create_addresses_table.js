exports.up = function (knex) {
  return knex.schema.createTable("addresses", function (table) {
    table.increments("id");
    table.string("city", 255);
    table.string("uf", 255);
    table.string("neighborhood", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
