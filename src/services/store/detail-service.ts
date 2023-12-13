import { findStore } from "@domain/repositories/store"

export default async (username: string) => {
  try {
    const store = await findStore({
      username: username
    })

    if(!store) return null;

    const response = {
      id: store?.id,
      username: store?.username,
      name: store?.name,
      photos: (store.photos) ? `stores/${store?.photos}` : null,
      description: store?.description,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }

    return response;
  } catch (err) {
    throw err
  }
}