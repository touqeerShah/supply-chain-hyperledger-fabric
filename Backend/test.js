const bcrypt = require("bcrypt");

async function test() {
  let password = await bcrypt.hash("admin@123", 12);
  console.log("password", password);
}

test();
