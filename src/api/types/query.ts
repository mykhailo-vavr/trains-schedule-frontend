import { OrderEnum } from '../utils/query';

export type SortQuery<S extends string = string> = {
  sort?: S;
  order?: OrderEnum;
};

export type SearchQuery = {
  search?: string;
};
