export interface createStoreInterface {
  user_id       : string,
  username      : string,
  name          : string,
  photos?       : string,
  description?  : string
}

export interface findStoreInterface {
  id?         : number,
  user_id?    : string,
  name?       : string,
  username?   : string
}