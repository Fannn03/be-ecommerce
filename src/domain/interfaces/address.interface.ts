import { Prisma } from "@prisma/client";

export interface findAddressInterface {
  userId   : string,
  skip?    : number,
  take?    : number,
  query?   : Prisma.AddressWhereInput[]
}

export interface createAdrressInterface {
  user_id    :  string,
  name       :  string,
  phone      :  string,
  street     :  string,
  zip_code   :  number,
  village    :  string,
  district   :  string,
  regency    :  string,
  province   :  string,
  latitude   :  number,
  longitude  :  number
}