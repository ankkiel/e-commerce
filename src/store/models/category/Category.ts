export type Category = {
  id: string;
  name: string;
  image: string;
};

export type CategoryApiModel = {
  id: string;
  name: string;
  image: string;
};

export const normalizeCategory = (raw: CategoryApiModel): Category => ({
  id: raw.id,
  name: raw.name,
  image: raw.image,
});
