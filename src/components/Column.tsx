import { useState } from "react";
import { AddCard } from "./AddCard";
import { Card, DropIndicator } from "./Card";
import { Status, Ticket } from "../types";

export const Column = ({
  title,
  status,
  tickets,
  onTicketCreated,
}: {
  title: string;
  status: Status;
  tickets: Ticket[] | null;
  onTicketCreated: () => void;
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: Ticket
  ) => {
    e.dataTransfer && e.dataTransfer.setData("cardId", card._id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const filteredTickets = tickets?.filter((item) => item.status === status);
  return (
    <div className=" w-60 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredTickets?.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredTickets?.map((item) => {
          return (
            <Card key={item._id} {...item} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} status={status} />
        <AddCard status={status} onTicketCreated={onTicketCreated} />
      </div>
    </div>
  );
};
