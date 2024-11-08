import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import axios from "axios";
import { Status } from "../types";

export const AddCard = ({
  status,
  onTicketCreated,
}: {
  status: Status;
  onTicketCreated: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim().length) return;

    try {
      await axios.post("http://localhost:5000/api/tickets", {
        title,
        status,
      });
      onTicketCreated();
      setTitle("");
      setAdding(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};
