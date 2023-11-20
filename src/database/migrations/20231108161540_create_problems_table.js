exports.up = function (knex) {
  return knex.schema.createTable("problems", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.integer("address_id").notNullable();
    table.foreign("address_id").references("addresses.id");
    table.string("imgUrl", 255).notNullable();
    table
      .timestamp("deadline")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP + interval '3 days'"));
    table.string("pix", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("problems");
};
