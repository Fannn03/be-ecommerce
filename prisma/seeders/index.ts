import superAdminSeeder from "./super-admin-seeder";
import userSeeder from "./user-seeder";
import storeSeeder from "./store-seeder";
import categorySeeder from "./category-seeder";
import productSeeder from "./product-seeder";
import ratingSeeder from "./rating-seeder";
import addressSeeder from "./address-seeder";

interface Seeder {
  name: string,
  run: Function
}

// TODO: using dynamic import module
// TODO: implemented select options using inquirer

(() => {
  const args = process.argv
  const seeders: Seeder[] = []

  seeders.push(superAdminSeeder)
  seeders.push(userSeeder)
  seeders.push(storeSeeder)
  seeders.push(categorySeeder)
  seeders.push(productSeeder)
  seeders.push(ratingSeeder)
  seeders.push(addressSeeder)

  const getAllSeederName = () => {
    console.log("Available seeders name :\n");

    seeders.map((value: Seeder) => {
      return console.log(`- ${value.name}`)
    })
  }

  if(args.length < 3) {
    console.log("Missing arguments of seeder name, usage : npm run seed [seeder name]\n")
    return getAllSeederName()
  }
  
  seeders.find((seed: Seeder) => {
    if(seed.name === args[2].toLowerCase()) {
      return seed.run()
    }
  })
})()