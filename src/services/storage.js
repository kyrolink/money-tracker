import { STORAGE_KEY } from "../constants/storageKeys";
import { DEFAULT_DATA } from "../constants/defaultData";

export function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    saveData(DEFAULT_DATA);
    return DEFAULT_DATA;
  }

  return JSON.parse(data);
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}