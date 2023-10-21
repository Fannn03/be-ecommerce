import superAdminSeeder from "./super-admin-seeder";

( async () => {
  try {
    await superAdminSeeder()
  } catch (err) {
    throw err
  }
})()