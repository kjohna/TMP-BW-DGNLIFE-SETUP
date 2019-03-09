exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex("test")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("test").insert([
        { testData: "rowValue1" },
        { testData: "rowValue2" }
      ]);
    });
};
