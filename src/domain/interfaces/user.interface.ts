export interface createUserInterface {
  id?       : string,
  email     : string,
  name      : string,
  password  : string,
}

export interface updateUserInterface {
  id    : string,
  email : string,
  name  : string
}