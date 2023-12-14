import { AdminLevel } from "@prisma/client";

export interface createAdminInterface {
  name      : string;
  email     : string;
  password  : string; 
  level     : AdminLevel;
}

export interface updateAdminInterface {
  name      : string;
  email     : string;
  password? : string; 
  level     : AdminLevel;
}