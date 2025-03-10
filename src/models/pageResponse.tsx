export type PageResponse<T> = {
    content: T[];
    page: PageInfo;
};
  
type PageInfo = {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
  