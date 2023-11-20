exports.up = function (knex) {
  return knex.schema.createTable("solutions", function (table) {
    table.increments("id");
    table.integer("price").notNullable();
    table.string("title", 255).notNullable();
    table.string("imgUrl", 255);
    table.integer("problem_id").notNullable();
    table.foreign("problem_id").references("problems.id");
    table.string("description").notNullable();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table
      .timestamp("budgetDeadline")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP + interval '3 days'"));
    table.integer("earnedMoney");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("solutions");
};
