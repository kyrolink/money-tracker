import useApp from "../../hooks/useApp";
import { ACTIONS } from "../../reducers/AppReducer";

import { useState } from "react";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Settings() {
  const { state, dispatch } = useApp();

  const handleCurrencyChange = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_SETTINGS,
      payload: {
        currency: e.target.value,
      },
    });
  };

  // const handleReset = () => {
  //   const confirmReset = window.confirm(
  //     "Are you sure?\n\nThis will permanently delete all transactions, categories and settings."
  //   );

  //   if (!confirmReset) return;

  //   localStorage.removeItem("money-tracker");

  //   window.location.reload();
  // };
  const handleReset = () => {
    localStorage.removeItem("money-tracker");
    window.location.reload();
  };

  const [openResetModal, setOpenResetModal] =
  useState(false);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* Currency */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-4">
          Currency
        </h2>

        <select
          className="border rounded-xl p-3 w-full max-w-sm"
          value={state.settings.currency}
          onChange={handleCurrencyChange}
        >
          <option value="IDR">
            Indonesian Rupiah (Rp)
          </option>

          <option value="USD">
            US Dollar ($)
          </option>

          <option value="EUR">
            Euro (€)
          </option>

          <option value="JPY">
            Japanese Yen (¥)
          </option>

          <option value="SGD">
            Singapore Dollar (S$)
          </option>

        </select>

      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-2">
          Data Management
        </h2>

        <p className="text-gray-500 mb-6">
          Your data is stored locally in your browser.
        </p>

        <div className="border-t pt-6">

          <h3 className="text-lg font-semibold text-red-600">
            Danger Zone
          </h3>

          <p className="text-gray-500 mt-2 mb-5">
            Delete all transactions, categories and settings.
            This action cannot be undone.
          </p>

          {/* <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
          >
            Reset All Data
          </button> */}

          <button
            onClick={() => setOpenResetModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
          >
            Reset All Data
          </button>

        </div>

      </div>
      <ConfirmModal
        open={openResetModal}
        onClose={() => setOpenResetModal(false)}
        onConfirm={handleReset}
        title="Reset All Data"
        message="This action will permanently delete all transactions, categories, and settings stored on this device. This action cannot be undone."
        confirmText="Delete"
        danger
      />

    </div>
  );
}