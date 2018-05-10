exports.up = knex => {
  return knex.schema.createTable('articles', table => {
    table.uuid('id').primary();
    table.string('title');
    table.text('text');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('articles');
};
