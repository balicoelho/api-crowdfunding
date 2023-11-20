exports.up = function (knex) {
  return knex.schema.createTable("votes", function (table) {
    table.increments("id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.timestamp("date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("votes");
};
