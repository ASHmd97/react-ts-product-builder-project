import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
  tittle: string;
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const Modal = ({ isOpen, closeModal, tittle, children }: IProps) => {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeModal}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 backdrop-brightness-75 backdrop-blur-sm">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6  shadow-xl">
                  {tittle && (
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-black">
                      {tittle}
                    </DialogTitle>
                  )}

                  <div className="mt-4">
                    {/* <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeModal}>
                      Got it, thanks!
                    </Button> */}
                    {children}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
