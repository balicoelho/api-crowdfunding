exports.up = function (knex) {
  return knex.schema.alterTable("solutions", function (table) {
    table.string("imgUrl").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("solutions", function (table) {
    table.string("imgUrl").notNullable().alter();
  });
};
