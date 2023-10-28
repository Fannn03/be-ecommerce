import 'dotenv/config'
import { createAdmin, deleteAdmin } from "../../repositories/admin";
import { Admin, AdminLevel } from '@prisma/client';

interface deleteParams {
  id      : number;
}


export default async (req: deleteParams) => {
  try {
    const adminCreated = await deleteAdmin(Number(req.id));

    if(!adminCreated) return false

    return true
  } catch (err) {
    return err
  }
}