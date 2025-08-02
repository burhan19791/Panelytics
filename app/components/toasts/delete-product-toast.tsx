import { toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";

export const showDeleteToast = () => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } flex w-full max-w-xs items-center rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800`}
    >
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal text-gray-700 dark:text-gray-300">
        Product has been deleted.
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 12 12M13 1 1 13"
          />
        </svg>
      </button>
    </div>
  ));
};
