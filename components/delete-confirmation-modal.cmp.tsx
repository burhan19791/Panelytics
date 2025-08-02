"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type DeleteConfirmationModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
};

export function DeleteConfirmationModal({
  show,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
}: DeleteConfirmationModalProps) {
  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onConfirm}>
              Yes, I&apos;m sure
            </Button>
            <Button color="alternative" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
