import create from 'zustand';

type UseTokenDrop = {
    token: {
        1?: string;
        2?: string;
        3?: string;
    };
    setToken: (tokenNum: number, value: string) => void;
}

export const useTokenDrop = create<UseTokenDrop>(set => ({
  token: {
    1: '',
    2: '',
    3: '',
  },
  setToken: (tokenNum: number, value: string) =>
    set((state) => ({
      ...state,
      token: {
        ...state.token,
        [tokenNum]: value,
      },
    })),
}));
