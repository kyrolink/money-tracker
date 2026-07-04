export default function TransactionPagination({

  currentPage,
  totalPages,
  setCurrentPage,

}) {

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (

    <div className="flex justify-between items-center mt-6">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        className="px-4 py-2 rounded-xl border disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex gap-2">

        {pages.map((page) => (

          <button
            key={page}
            onClick={() =>
              setCurrentPage(page)
            }
            className={`w-10 h-10 rounded-xl transition ${
              currentPage === page
                ? "bg-amber-500 text-white"
                : "border hover:bg-slate-100"
            }`}
          >
            {page}
          </button>

        ))}

      </div>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        className="px-4 py-2 rounded-xl border disabled:opacity-40"
      >
        Next
      </button>

    </div>

  );

}