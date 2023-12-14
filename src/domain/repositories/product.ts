import { PrismaClient } from "@prisma/client";
import { createProductInterface } from "@domain/interfaces/product.interface";
import { categoriesQuery } from "@services/product/findall-service";
import { createProductPhotoInterface } from "@domain/interfaces/product-photo.interface";

const prisma = new PrismaClient();

export const findAllProduct = async (take: number, skip: number, categories: categoriesQuery) => {
  try {
    return await prisma.$transaction([
      prisma.product.count({
        where: {
          deletedAt: null,
          AND: [
            { category: categories },
            {
              store: { deletedAt: null }
            }
          ]
        }
      }),
      prisma.product.findMany({
        where: {
          deletedAt: null,
          AND: [
            { category: categories },
            { 
              store: { deletedAt: null }
            }
          ]
        },
        orderBy: [
          { createdAt: 'desc' }
        ],
        include: {
          store: true,
          images: true,
          category: true
        },
        take: take,
        skip: skip
      })
    ])
  } catch (err) {
    throw err
  }
}

export const findProduct = async (query: any) => {
  try {
    return await prisma.product.findFirst({
      where: {
        OR: [
          {id: query.id},
          {slug: query.slug},
          {name: query.name}
        ],
        deletedAt: null,
        store: {
          deletedAt: null
        }
      },
      include: {
        store: true,
        images: true
      }
    })
  } catch (err) {
    throw err
  }
}

export const createProduct = async (body: createProductInterface, photos: createProductPhotoInterface[]) => {
  try {
    return prisma.product.create({
      data: {
        store_id: body.store_id,
        category_id: body.categpry_id,
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        stock: body.stock,
        images: {
          create: photos
        }
      },
      include: {
        images: true
      }
    })
  } catch (err) {
    throw err
  }
}