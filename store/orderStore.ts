import { create } from "zustand";

const generateCartSessionId = (): string => {
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `CS-${randomPart}`;
};

interface OrderStore {
  cartSessionId: string;
  setCartSessionId: () => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  cartSessionId: generateCartSessionId(),
  setCartSessionId: () => set({ cartSessionId: generateCartSessionId() }),
}));

export default useOrderStore;
