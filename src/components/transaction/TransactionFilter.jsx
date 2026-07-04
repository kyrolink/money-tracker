export default function TransactionFilter({
  search,
  setSearch,

  type,
  setType,

  category,
  setCategory,

  sort,
  setSort,

  fromDate,
  setFromDate,

  toDate,
  setToDate,

  categories,
}) {
  const resetFilter = () => {
    setSearch("");
    setType("all");
    setCategory("all");
    setSort("newest");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="bg-white rounded-2xl border p-5 mb-6">

      <div className="grid lg:grid-cols-4 gap-4">

        <input
          className="border rounded-xl p-3"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          className="border rounded-xl p-3"
          value={type}
          onChange={(e)=>setType(e.target.value)}
        >
          <option value="all">All Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border rounded-xl p-3"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="all">
            All Category
          </option>

          {categories.map((cat)=>(
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}

        </select>

        <select
          className="border rounded-xl p-3"
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>

        </select>

      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">

        <input
          type="date"
          className="border rounded-xl p-3"
          value={fromDate}
          onChange={(e)=>setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded-xl p-3"
          value={toDate}
          onChange={(e)=>setToDate(e.target.value)}
        />

        <button
          onClick={resetFilter}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Reset Filter
        </button>

      </div>

    </div>
  );
}