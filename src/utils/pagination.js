export function paginate(
  data,
  currentPage,
  perPage
) {

  const totalItems = data.length;

  const totalPages = Math.ceil(
    totalItems / perPage
  );

  const startIndex =
    (currentPage - 1) * perPage;

  const endIndex =
    startIndex + perPage;

  return {

    data: data.slice(
      startIndex,
      endIndex
    ),

    totalItems,

    totalPages,

    startIndex,

    endIndex,

  };

}