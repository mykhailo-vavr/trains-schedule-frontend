import { FC, FCWithChildren } from './components';

export type NextPage<T = any> = FC<T>;

export type NextLayout = FCWithChildren;
