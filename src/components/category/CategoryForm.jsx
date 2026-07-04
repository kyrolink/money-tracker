import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import useApp from "../../hooks/useApp";
import { ACTIONS } from "../../reducers/AppReducer";

import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";

export default function CategoryForm({
  open,
  onClose,
  editData = null,
}) {
  const { state, dispatch } = useApp();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#F59E0B");
  const [icon, setIcon] = useState("LuTag");
  const [type, setType] = useState("expense");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setColor(editData.color);
      setIcon(editData.icon);
      setType(editData.type);
    } else {
      setName("");
      setColor("#F59E0B");
      setIcon("LuTag");
      setType("expense");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required.");
      return;
    }

    const duplicate = state.categories.find(
      (item) =>
        item.name.toLowerCase() === name.trim().toLowerCase() &&
        item.id !== editData?.id
    );

    if (duplicate) {
      alert("Category already exists.");
      return;
    }

    if (editData) {
      dispatch({
        type: ACTIONS.UPDATE_CATEGORY,
        payload: {
          ...editData,
          name: name.trim(),
          color,
          type,
          icon,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_CATEGORY,
        payload: {
          id: uuid(),
          name: name.trim(),
          color,
          type,
          icon,
          isDefault: false,
          createdAt: new Date().toISOString(),
        },
      });
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      title={editData ? "Edit Category" : "Add Category"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Category Name"
          placeholder="Example : Vacation"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Category Type
          </label>

          <select
            className="border rounded-xl p-3 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Choose Color
          </label>

          <ColorPicker
            value={color}
            onChange={setColor}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Choose Icon
          </label>

          <IconPicker
            value={icon}
            onChange={setIcon}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}