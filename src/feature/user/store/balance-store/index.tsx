import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { StateCreator } from "zustand";

type NumericString = string;

interface BalancePayload {
  BalanceVoteA: NumericString;
  BalanceVoteB: NumericString;
  UserBalanceAllVotes: NumericString;
  UserDepositBalance: NumericString;
}

interface BalanceState {
  balance: BalancePayload;
  setBalance: (value: BalancePayload) => void;
  updateBalanceField: <K extends keyof BalancePayload>(
    field: K,
    value: BalancePayload[K]
  ) => void;
  addBalanceToField: <K extends keyof BalancePayload>(
    field: K,
    amount: NumericString
  ) => void;
  subtractBalanceFromField: <K extends keyof BalancePayload>(
    field: K,
    amount: NumericString
  ) => void;
  clearBalance: () => void;
}

const balanceStoreCreator: StateCreator<
  BalanceState,
  [["zustand/immer", never]],
  []
> = (set) => ({
  balance: {
    BalanceVoteA: "0",
    BalanceVoteB: "0",
    UserBalanceAllVotes: "0",
    UserDepositBalance: "0",
  },
  setBalance: (value) =>
    set((state) => {
      state.balance = value;
    }),
  updateBalanceField: (field, value) =>
    set((state) => {
      state.balance[field] = value;
    }),
  addBalanceToField: (field, amount) =>
    set((state) => {
      const currentValue = parseFloat(state.balance[field]);
      const amountToAdd = parseFloat(amount);

      if (isNaN(currentValue) || isNaN(amountToAdd)) {
        console.warn(`Invalid numeric value for ${field}`);
        return;
      }

      state.balance[field] = (currentValue + amountToAdd).toString();
    }),
  subtractBalanceFromField: (field, amount) =>
    set((state) => {
      const currentValue = parseFloat(state.balance[field]);
      const amountToSubtract = parseFloat(amount);

      if (isNaN(currentValue) || isNaN(amountToSubtract)) {
        console.warn(`Invalid numeric value for ${field}`);
        return;
      }

      state.balance[field] = (currentValue - amountToSubtract).toString();
    }),
  clearBalance: () =>
    set((state) => {
      state.balance = {
        BalanceVoteA: "0",
        BalanceVoteB: "0",
        UserBalanceAllVotes: "0",
        UserDepositBalance: "0",
      };
    }),
});

const useBalanceStore = create<BalanceState>()(immer(balanceStoreCreator));

export default useBalanceStore;
