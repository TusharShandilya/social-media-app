import { useState } from "react";

const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);

  const toggleModal = () => setModalOpen(!modalOpen);
  return { modalOpen, toggleModal };
};

export default useModal;
