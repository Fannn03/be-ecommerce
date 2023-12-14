import { Prisma, PrismaClient } from "@prisma/client";
import { countRatingInterface, createRatingInterface, findRatingInterface, findRatingQueryInterface } from "@domain/interfaces/rating.interface";

const prisma = new PrismaClient();

export const countRating = async (params: countRatingInterface) => {
  return await prisma.rating.count({
    where: {
      deletedAt: null,
      AND: [
        (params.rating) ? { rating: params.rating } : {},
        (params.slug) ? { product: { slug: params.slug } } : {}
      ]
    }
  })
}

export const findAllRating = async (productSlug: string, take: number, skip: number, query?: findRatingQueryInterface[], sortBy?: any) => {
  return await prisma.rating.findMany({
    where: {
      product: {
        slug: productSlug,
        deletedAt: null
      },
      AND: query
    },
    take: take,
    skip: skip,
    orderBy: [
      sortBy
    ],
    include: {
      user: true,
      images: true
    }
  })
} 

export const findRating = async (params: findRatingInterface, userId?: string) => {
  return await prisma.rating.findFirst({
    where: {
      OR: [
        { product_id: params.product_id },
        { product: { slug: params.product_slug } }
      ],
      AND: [
        { deletedAt: null },
        { user_id: userId }
      ]
    },
    include: {
      product: true
    }
  })
}

export const createRating = async (body: createRatingInterface, images: Prisma.RatingImageCreateInput[]) => {
  try {
    return await prisma.rating.create({
      data: {
        user_id: body.user_id,
        product_id: body.product_id,
        rating: body.rating,
        comment: body.comment,
        images: {
          create: images
        }
      },
      include: {
        images: true,
        product: true
      }
    })
  } catch (err) {
    throw err;
  }
}