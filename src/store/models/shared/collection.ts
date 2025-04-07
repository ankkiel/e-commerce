export type CollectionModel<K extends string | number, T> = {
  readonly order: K[];
  readonly entities: Record<K, T>;
};

export const getInitialCollectionModel = <K extends string | number, T>(): CollectionModel<K, T> => ({
  order: [],
  entities: {} as Record<K, T>,
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K,
): CollectionModel<K, T> => {
  const collection = getInitialCollectionModel<K, T>();

  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(collection: CollectionModel<K, T>): T[] =>
  collection.order.map((id) => collection.entities[id]);
