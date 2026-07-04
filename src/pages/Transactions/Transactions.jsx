import { useEffect, useMemo, useState } from "react";

import useApp from "../../hooks/useApp";
import { ACTIONS } from "../../reducers/AppReducer";

import TransactionForm from "../../components/transaction/TransactionForm";
import TransactionTable from "../../components/transaction/TransactionTable";
import TransactionFilter from "../../components/transaction/TransactionFilter";
import TransactionPagination from "../../components/transaction/TransactionPagination";

import { filterTransactions } from "../../utils/transactionFilter";
import { paginate } from "../../utils/pagination";

export default function Transactions() {
  const { state, dispatch } = useApp();

  const [showModal, setShowModal] = useState(false);

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  // ===========================
  // Filter State
  // ===========================

  const [search, setSearch] = useState("");

  const [type, setType] = useState("all");

  const [category, setCategory] =
    useState("all");

  const [sort, setSort] =
    useState("newest");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  // ===========================
  // Pagination
  // ===========================

  const [currentPage, setCurrentPage] =
    useState(1);

  const PER_PAGE = 10;

  // ===========================
  // Filter
  // ===========================

  const filteredTransactions =
    useMemo(() => {
      return filterTransactions(
        state.transactions,
        {
          search,
          type,
          category,
          sort,
          fromDate,
          toDate,
          categories: state.categories
        }
      );
    }, [
      state.transactions,
      search,
      type,
      category,
      sort,
      fromDate,
      toDate,
    ]);

  // Reset page ketika filter berubah

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    type,
    category,
    sort,
    fromDate,
    toDate,
  ]);

  const {
    data: paginatedTransactions,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
  } = paginate(
    filteredTransactions,
    currentPage,
    PER_PAGE
  );

  // ===========================
  // Action
  // ===========================

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Delete this transaction?"
      )
    ) {
      return;
    }

    dispatch({
      type: ACTIONS.DELETE_TRANSACTION,
      payload: id,
    });
  };

  const handleEdit = (trx) => {
    setEditingTransaction(trx);
    setShowModal(true);
  };

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your income &
            expense
          </p>

        </div>

        <button
          onClick={() => {
            setEditingTransaction(null);
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Transaction
        </button>

      </div>

      {/* Filter */}

      <TransactionFilter
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        categories={state.categories}
      />

      {/* Counter */}

      <div className="flex justify-between items-center mb-4">

        <p className="text-sm text-slate-500">

          Showing{" "}
          {totalItems === 0
            ? 0
            : startIndex + 1}
          {" - "}
          {Math.min(
            endIndex,
            totalItems
          )}{" "}
          of {totalItems}
          transaction(s)

        </p>

      </div>

      {/* Table */}

      {totalItems === 0 ? (

        <div className="bg-white rounded-2xl border p-12 text-center">

          <h2 className="text-xl font-semibold">

            No Transaction

          </h2>

          <p className="text-slate-500 mt-2">

            Try changing your
            filters.

          </p>

        </div>

      ) : (

        <>

          <TransactionTable
            transactions={
              paginatedTransactions
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <TransactionPagination
            currentPage={
              currentPage
            }
            totalPages={totalPages}
            setCurrentPage={
              setCurrentPage
            }
          />

        </>

      )}

      {/* Modal */}

      <TransactionForm
        open={showModal}
        editData={editingTransaction}
        onClose={() => {
          setShowModal(false);
          setEditingTransaction(null);
        }}
      />

    </div>
  );
}