exports.up = function (knex) {
  return knex.schema.table("votes", function (table) {
    table.integer("solutions_id");
    table
      .foreign("solutions_id")
      .references("solutions.id")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("votes", function (table) {
    table.dropColumn("solutions.id");
  });
};
