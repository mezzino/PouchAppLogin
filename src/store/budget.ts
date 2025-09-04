import { create } from "zustand";
import { supabase } from "@/src/lib/supabase";

export type BudgetCategory = {
  id: string;
  name: string;
  amount: number;
};

type BudgetState = {
  categories: BudgetCategory[];
  addCategory: (name: string, amount: number) => Promise<void>;
  setAmount: (id: string, amount: number) => void;
  loadFromDb: () => Promise<void>;
};

export const useBudgetStore = create<BudgetState>((set, get) => ({
  categories: [],

  addCategory: async (name, amount) => {
    const id = crypto.randomUUID();
    const cat: BudgetCategory = { id, name, amount };
    set({ categories: [...get().categories, cat] });
    // Note: Upsert to DB is performed from UI for explicitness
  },

  setAmount: (id, amount) => {
    set({
      categories: get().categories.map((c) => (c.id === id ? { ...c, amount } : c))
    });
  },

  loadFromDb: async () => {
    const { data, error } = await supabase.from("budgets").select("id, category, amount");
    if (!error && data) {
      set({
        categories: data.map((row: any) => ({
          id: row.id,
          name: row.category,
          amount: Number(row.amount || 0)
        }))
      });
    }
  }
}));
