export interface createRatingInterface {
  user_id       : string,
  product_id    : number,
  rating        : number,
  comment       : string,
}

export interface findRatingInterface {
  product_id?: number,
  product_slug?: string
}

export interface findRatingQueryInterface {
  rating: number
}

export interface countRatingInterface {
  rating?: number,
  slug?: string
}