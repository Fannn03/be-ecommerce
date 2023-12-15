import { countRating, findAllRating } from "@domain/repositories/rating"

export default async (productSlug: string, query: any) => {
  const take = Number(query.take) || 10;
  const skip = (Number(query.page) * take) - take || 0;
  const queries = [];
  let sort: any = {};

  if(query.rating) queries.push({ rating: Number(query.rating) });
  (query.sortBy) ? sort["createdAt"] = query.sortBy : sort["createdAt"] = "desc";
  
  const ratings = await findAllRating(productSlug, take, skip, queries, sort);
  if(!ratings.length) return null;

  const countRatings = await countRating({ slug: productSlug });
  const countRatingOne = await countRating({ rating: 1, slug: productSlug });
  const countRatingTwo = await countRating({ rating: 2, slug: productSlug});
  const countRatingThree = await countRating({ rating: 3,  slug: productSlug});
  const countRatingFour = await countRating({ rating: 4, slug: productSlug});
  const countRatingFive = await countRating({ rating: 5, slug: productSlug});

  const mappedRatings = ratings.map((data: any) => ({
    user: data.user.name,
    rating: data.rating,
    comment: data.comment,
    images: (!data.images.length) ? [] : data.images.map((data: any) => ({
      name: `ratings/${data.name}`
    })),
    createdAt: data.createdAt
  }))

  const response = {
    comment: mappedRatings,
    ratings: {
      starsOne: countRatingOne,
      starsTwo: countRatingTwo,
      starsThree: countRatingThree,
      starsFour: countRatingFour,
      starsFive: countRatingFive
    },
    page: {
      size: ratings.length,
      total: (query.rating) ? await countRating({ rating: Number(query.rating), slug: productSlug }) : countRatings,
      totalPages: Math.ceil(countRatings / take)
    }
  }

  return response;
}