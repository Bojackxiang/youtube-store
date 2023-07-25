import { create } from 'zustand';


interface AuthModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: () => set({ isOpen: true,}),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;