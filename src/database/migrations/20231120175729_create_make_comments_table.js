exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.integer("problem_id").notNullable();
    table.foreign("problem_id").references("problems.id");
    table.string("comment", 255).notNullable();
    table.string("imgUrl", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
