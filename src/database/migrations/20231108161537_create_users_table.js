exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("fullname", 255).notNullable();
    table.date("birthdate").notNullable();
    table.string("cellphone", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
