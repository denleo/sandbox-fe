export type ErrorPayload = {
  name: string;
  description: string;
};

export type Pageable<T> = {
  page: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
  items: T[];
};

export enum Order {
  Ascending,
  Descending,
}
