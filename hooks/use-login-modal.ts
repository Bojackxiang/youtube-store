import { create } from 'zustand';


interface LoginModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: () => set({ isOpen: true,}),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;