import { SearchQuery, SortQuery } from '../types/query';

export interface GetSchedulesRequest extends SortQuery, SearchQuery {}
