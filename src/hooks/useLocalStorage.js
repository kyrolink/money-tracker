import { useEffect, useState } from "react";
import { loadData, saveData } from "../services/storage";

export default function useLocalStorage() {
  const [data, setData] = useState(loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  return {
    data,
    setData,
  };
}