import superAdminSeeder from "./super-admin-seeder";
import userSeeder from "./user-seeder";
import storeSeeder from "./store-seeder";
import categorySeeder from "./category-seeder";
import productSeeder from "./product-seeder";
import ratingSeeder from "./rating-seeder";

interface Seeder {
  name: string,
  run: Function
}

// TODO: using dynamic import module
// TODO: implemented select options using inquirer

(async () => {
  const seeders: Seeder[] = []

  seeders.push(superAdminSeeder)
  seeders.push(userSeeder)
  seeders.push(storeSeeder)
  seeders.push(categorySeeder)
  seeders.push(productSeeder)
  seeders.push(ratingSeeder)

  try {
    let number = 1;
    for(let seeder in seeders) {
      console.log(`[S] Running auto seeder [${number}/${seeders.length}]\n`);
      await seeders[seeder].run()
      console.log(`\n===========================\n`);
      number++;
    }
  } catch (err) {
    throw err;
  }
})()