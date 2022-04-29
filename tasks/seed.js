const connection = require("../config/mongoConnection");
const users = require("../data/users");

async function main() {
  const db = await connection();
  await db.dropDatabase();

  const user1 = await users.create(
    "Nikhila",
    "Benjaram",
    "nikhila.benjaram@gmail.com",
    "515-307-4981",
   {
      streetAddress: "3110 River street",
      city: "Newport",
      state: "NJ",
      zip: 07310,
    },
    "passwordissecret",
    "My name is Nikhila!"
  );
  console.log(user1);
  console.log("Done with seeding database");
  await db.s.client.close();
}

main();