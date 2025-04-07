import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import ApiStore, { HTTPMethod } from '@/store/ApiStore';
import { normalizeCategory, Category } from '@/store/models/category';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@/store/models/shared/collection.ts';
import { Meta } from '@/utils/meta.ts';
import { ILocalStore } from '@/utils/useLocalStore';

type PrivateFields = '_list' | '_meta';

const BASE_URL = API_BASE_URL;

export default class CategoryStore implements ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _list: CollectionModel<string, Category> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      reset: action,
      getCategoryList: action,
    });
  }

  get list(): Category[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoryList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const response = await this._apiStore.request<Category[]>({
        method: HTTPMethod.GET,
        headers: {},
        data: {},
        endpoint: API_ENDPOINTS.CATEGORIES,
      });

      runInAction(() => {
        if (response.success) {
          this._meta = Meta.success;
          const elements = response.data.map(normalizeCategory);
          this._list = normalizeCollection(elements, (el) => el.id);
        } else {
          this._meta = Meta.error;
        }
      });
    } catch {
      runInAction(() => {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      });
    }
  }

  reset(): void {
    this._list = getInitialCollectionModel();
    this._meta = Meta.initial;
  }

  destroy(): void {
    this.reset();
  }
}
