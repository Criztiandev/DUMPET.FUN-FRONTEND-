import { useCallback } from "react";

type SetItemFunction = <T>(value: T) => void;
type GetItemFunction = () => string | null;
type RemoveItemFunction = () => void;
type UpdateItemFunction = (updater: (prevValue: string) => string) => void;

interface UseLocalStorageReturn {
  setItem: SetItemFunction;
  getItem: GetItemFunction;
  removeItem: RemoveItemFunction;
  updateItem: UpdateItemFunction;
}

const useLocalStorage = (key: string): UseLocalStorageReturn => {
  const setItem: SetItemFunction = useCallback(
    <T>(value: T) => {
      try {
        // Ensure clean string storage without extra quotes
        const valueToStore =
          typeof value === "string"
            ? value.replace(/^"|"$/g, "") // Remove surrounding quotes if present
            : JSON.stringify(value).replace(/^"|"$/g, ""); // Convert to string and remove quotes

        window.localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    [key]
  );

  const getItem: GetItemFunction = useCallback(() => {
    try {
      const value = window.localStorage.getItem(key);
      // Return clean string without extra quotes
      return value?.replace(/^"|"$/g, "") ?? null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }, [key]);

  const removeItem: RemoveItemFunction = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  }, [key]);

  const updateItem: UpdateItemFunction = useCallback(
    (updater: (prevValue: string) => string) => {
      try {
        const currentValue = window.localStorage.getItem(key);
        if (currentValue !== null) {
          // Ensure clean string storage for updates too
          const newValue = updater(currentValue).replace(/^"|"$/g, "");
          window.localStorage.setItem(key, newValue);
        }
      } catch (error) {
        console.error("Error updating item in localStorage:", error);
      }
    },
    [key]
  );

  return { setItem, getItem, removeItem, updateItem };
};

export default useLocalStorage;
