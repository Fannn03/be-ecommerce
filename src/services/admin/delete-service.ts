import 'dotenv/config'
import { deleteAdmin } from "../../repositories/admin";

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