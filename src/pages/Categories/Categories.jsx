import { useState } from "react";

import useApp from "../../hooks/useApp";
import { ACTIONS } from "../../reducers/AppReducer";

import CategoryCard from "../../components/category/CategoryCard";
import CategoryForm from "../../components/category/CategoryForm";

export default function Categories() {
  const { state, dispatch } = useApp();

  const [showModal, setShowModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    dispatch({
      type: ACTIONS.DELETE_CATEGORY,
      payload: id,
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={handleAdd}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Category
        </button>

      </div>

      {state.categories.length === 0 ? (

        <div className="bg-white rounded-xl p-10 text-center border">

          No Category Found

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {state.categories.map((category) => (

            <CategoryCard
              key={category.id}
              category={category}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

          ))}

        </div>

      )}

      <CategoryForm
        open={showModal}
        onClose={handleClose}
        editData={selectedCategory}
      />

    </div>
  );
}