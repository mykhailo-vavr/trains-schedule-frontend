export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export const parseOrder = (order: string) => {
  if (order?.toLowerCase().startsWith(OrderEnum.DESC)) {
    return OrderEnum.DESC;
  }

  return OrderEnum.ASC;
};
