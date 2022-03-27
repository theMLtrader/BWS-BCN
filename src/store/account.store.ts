import create from 'zustand';

type UseAccount = {
  account: string;
  accountId: string;
  hash: string;
  optimizeCount: number;
  setAccountId: (id: string) => void;
  setAccount: (account: string) => void;
  setHash: (hash: string) => void;
  setOptimizeCount: (count: number) => void;
};

export const useAccount = create<UseAccount>((set) => ({
  account: '',
  accountId: '',
  hash: '',
  optimizeCount: 0,
  setAccountId: (id: string) => set((state) => ({ ...state, accountId: id })),
  setAccount: (acc: string) => set((state) => ({ ...state, account: acc })),
  setHash: (hash: string) => set((state) => ({ ...state, hash })),
  setOptimizeCount: (count: number) => set((state) => ({ ...state, optimizeCount: count })),
}));
