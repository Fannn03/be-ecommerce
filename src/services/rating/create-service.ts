import { JwtPayload } from "jsonwebtoken";
import { RatingImage } from "@prisma/client";
import slugify from "slugify";
import fs from 'fs';
import { UserJWT } from "../../middleware/auth-middleware";
import { createRating, findRating } from "../../repositories/rating";
import { findProduct } from "../../repositories/product";

export class CreateRatingError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (user: JwtPayload | UserJWT, body: any) => {
  const getProduct = await findProduct({
    id: Number(body.product_id)
  })
  if(!getProduct) throw new CreateRatingError("Product not found", 404, "not found");

  const isUserAlreadyGiveRating = await findRating({
    product_id: Number(body.product_id)
  }, user.id)
  if(isUserAlreadyGiveRating) throw new CreateRatingError("You have already submit rating before", 403, "forbidden");

  const photos = (!body.photos.length) ? [] : body.photos.map((data: Express.Multer.File, index: number) => ({
    oldPath: data.path,
    name: slugify(`${body.product_id}-${user.id}-${new Date().getTime()}-${index + 1}.${data.mimetype.split('/')[1]}`),
  }))

  try {
    const rating = await createRating({
      user_id: user.id,
      product_id: Number(body.product_id),
      rating: Number(body.rating),
      comment: body.comment
    }, (!body.photos.length) ? photos : photos.map((data: any) => ({
      name: data.name
    })))

    if(!body.photos.length) {
      for (let photo in photos) {
        fs.renameSync(photos[photo].oldPath, `public/images/ratings/${photos[photo].name}`)
      }
    }

    const response = {
      rating: rating.rating,
      comment: rating.comment,
      images: rating.images.map((data: RatingImage) => ({
        name: `ratings/${data.name}`
      })),
      product: {
        id: rating.product.id,
        name: rating.product.name
      }
    }

    return response;
  } catch (err) {
    if(body.photos.length) {
      const photos = body.photos;
      for (let photo in photos) {
        fs.rmSync(photos[photo].path)
      }
    }
    throw err;
  }
}