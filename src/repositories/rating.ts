import { Prisma, PrismaClient } from "@prisma/client";
import { number } from "joi";
import { registerAdmin } from "../controllers/admin-controller";

interface createUserInterface {
  user_id       : string,
  product_id    : number,
  rating        : number,
  comment       : string,
}

interface findRatingInterface {
  product_id?: number,
  product_slug?: string
}

interface queryInterface {
  rating: number
}

interface countRatingInterface {
  rating?: number,
  slug?: string
}

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

export const findAllRating = async (productSlug: string, take: number, skip: number, query?: queryInterface[], sortBy?: any) => {
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

export const createRating = async (data: createUserInterface, images: Prisma.RatingImageCreateInput[]) => {
  try {
    return await prisma.rating.create({
      data: {
        user_id: data.user_id,
        product_id: data.product_id,
        rating: data.rating,
        comment: data.comment,
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