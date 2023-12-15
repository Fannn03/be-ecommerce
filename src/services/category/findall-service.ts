import { Category } from "@prisma/client"
import { countCategory, findAllCategory } from "@domain/repositories/category"

export interface categoryInterface {
  id        :   number,
  name      :   string,
  slug      :   string,
  createdAt :   Date,
  updatedAt :   Date
}

export default async (query: any) => {
  const take = Number(query.take) || 10
  const skip = (Number(query.page) * take) - take || 0

  try {
    const categories = await findAllCategory(take, skip);
    const countCategories = await countCategory();
    const mapCategories = categories.map((data: Category) => ({
      id: data.id,
      name: data.name,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }));
    
    const response = {
      categories: mapCategories,
      pages: {
        size: mapCategories.length,
        total: countCategories,
        totalPages: Math.ceil(countCategories / take)
      }
    };

    return response;
  } catch (err) {
    throw err
  }
}