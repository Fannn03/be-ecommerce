import superAdminSeeder from "./super-admin-seeder";
import userSeeder from "./user-seeder";
import storeSeeder from "./store-seeder";
import categorySeeder from "./category-seeder";
import productSeeder from "./product-seeder";
import ratingSeeder from "./rating-seeder";
import addressSeeder from "./address-seeder";
import cartSeeder from "./cart-seeder";

interface Seeder {
  name: string,
  run: Function
}

// TODO: using dynamic import module
// TODO: implemented select options using inquirer

/*
  Default value seeder name
  - Supeadmin : 1;
  - User      : 100;
  - Address   : 50;
  - Store     : 50;
  - Category  : less than 10;
  - Product   : 50;
  - Cart      : 75;
  - Rating    : 100;
*/

(async () => {
  const seeders: Seeder[] = []

  seeders.push(superAdminSeeder)
  seeders.push(userSeeder)
  seeders.push(addressSeeder)
  seeders.push(storeSeeder)
  seeders.push(categorySeeder)
  seeders.push(productSeeder)
  seeders.push(cartSeeder)
  seeders.push(ratingSeeder)

  try {
    let number = 1;
    for(let seeder in seeders) {
      console.log(`[S] Running auto seeder ${seeders[seeder].name} [${number}/${seeders.length}]\n`);
      await seeders[seeder].run()
      console.log(`\n===========================\n`);
      number++;
    }
  } catch (err) {
    throw err;
  }
})()