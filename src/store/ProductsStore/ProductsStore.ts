import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import ApiStore, { HTTPMethod } from '@/store/ApiStore';
import { normalizeProductItem, ProductItemModel } from '@/store/models/products';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@/store/models/shared/collection.ts';
import { Meta } from '@/utils/meta.ts';
import { ILocalStore } from '@/utils/useLocalStore';

type PrivateFields = '_list' | '_meta' | '_product';

const BASE_URL = API_BASE_URL;

export default class ProductsStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _list: CollectionModel<string, ProductItemModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _product: ProductItemModel | null = null;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _product: observable.ref,
      list: computed,
      product: computed,
      meta: computed,
      reset: action,
      getProductsList: action.bound,
      getProduct: action.bound,
    });
  }

  get list(): ProductItemModel[] {
    return linearizeCollection(this._list).flat();
  }

  get product(): ProductItemModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const response = await this._apiStore.request<ProductItemModel[]>({
        method: HTTPMethod.GET,
        data: {},
        headers: {},
        endpoint: `${API_ENDPOINTS.PRODUCTS}`,
      });

      runInAction(() => {
        if (response.success) {
          this._meta = Meta.success;
          let elements = response.data;

          if (elements.length) {
            elements = elements.map(normalizeProductItem);
          }

          this._list = normalizeCollection(elements, (el) => el.id);
        } else {
          this.handleError();
        }
      });
    } catch {
      this._meta = Meta.error;
      this._list = getInitialCollectionModel();
    }
  }

  async getProduct(id: string) {
    this._meta = Meta.loading;
    this._product = null;

    try {
      const response = await this._apiStore.request<ProductItemModel>({
        method: HTTPMethod.GET,
        data: {},
        headers: {},
        endpoint: `${API_ENDPOINTS.PRODUCTS}${id}`,
      });

      runInAction(() => {
        if (response.success) {
          this._meta = Meta.success;
          this._product = normalizeProductItem(response.data);
        } else {
          this.handleError();
        }
      });
    } catch {
      this._meta = Meta.error;
      this._product = null;
    }
  }

  private handleError(): void {
    this._meta = Meta.error;
    this._list = getInitialCollectionModel();
    this._product = null;
  }

  reset(): void {
    this._list = getInitialCollectionModel();
    this._meta = Meta.initial;
    this._product = null;
  }

  destroy(): void {
    this.reset();
  }
}
