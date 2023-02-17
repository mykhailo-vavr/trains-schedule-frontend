export const validateId = (id: any) => {
  if (!id) {
    return false;
  }

  const numberId = +id;

  return !Number.isNaN(+numberId) && Number.isSafeInteger(numberId) && numberId > 0;
};
