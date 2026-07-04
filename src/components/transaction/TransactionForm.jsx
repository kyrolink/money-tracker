import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import useApp from "../../hooks/useApp";
import { ACTIONS } from "../../reducers/AppReducer";

import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import CategoryForm from "../category/CategoryForm";

export default function TransactionForm({
  open,
  onClose,
  editData,
}) {
  const { state, dispatch } = useApp();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    if (editData) {
      setAmount(editData.amount);
      setType(editData.type);
      setCategoryId(editData.categoryId);
      setNote(editData.note);
      setTransactionDate(editData.transactionDate);
    } else {
      resetForm();
    }
  }, [editData, open]);

  const resetForm = () => {
    setAmount("");
    setType("expense");
    setCategoryId("");
    setNote("");
    setTransactionDate(
      new Date().toISOString().slice(0, 10)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Amount is required");
      return;
    }

    if (!categoryId) {
      alert("Category is required");
      return;
    }

    const payload = {
      id: editData ? editData.id : uuid(),
      amount: Number(amount),
      type,
      categoryId,
      note,
      transactionDate,
      createdAt: editData
        ? editData.createdAt
        : new Date().toISOString(),
    };

    dispatch({
      type: editData
        ? ACTIONS.UPDATE_TRANSACTION
        : ACTIONS.ADD_TRANSACTION,
      payload,
    });

    resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={
        editData
          ? "Edit Transaction"
          : "Add Transaction"
      }
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="100000"
        />

        <div className="mb-5">
          <label className="block mb-2">
            Type
          </label>

          <select
            className="border rounded-xl p-3 w-full"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategoryId("");
            }}
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>
          </select>
        </div>

        <div className="mb-5">

          <label className="block mb-2">
            Category
          </label>

          <select
            className="border rounded-xl p-3 w-full"
            value={categoryId}
            onChange={(e)=>setCategoryId(e.target.value)}
          >

            <option value="">
              Select Category
            </option>

            {state.categories
              .filter(item => item.type === type)
              .map(item => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}

          </select>

          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="mt-2 text-sm text-amber-600 hover:underline"
          >
            + Add New Category
          </button>

        </div>

        <div className="mb-5">
          <label className="block mb-2">
            Date
          </label>

          <input
            type="date"
            className="border rounded-xl p-3 w-full"
            value={transactionDate}
            onChange={(e) =>
              setTransactionDate(
                e.target.value
              )
            }
          />
        </div>

        <Input
          label="Description"
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          placeholder="Optional"
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
      <CategoryForm
          open={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
      />
    </Modal>
    
    
  );
}