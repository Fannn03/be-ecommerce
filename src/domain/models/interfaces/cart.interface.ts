export interface createCartInterface {
  user_id     : string,
  product_id  : number,
  quantity    : number
}

export interface updateCartInterface {
  id          : string,
  quantity    : number
}