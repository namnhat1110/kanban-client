import React from "react";
import { useAxios } from "../hooks/useAxios";
import { Column } from "./Column";
import { Status, Ticket } from "../types";

const titleMapper: { [key in Status]: string } = {
  [Status.BACKLOG]: "Backlog",
  [Status.TODO]: "Todo",
  [Status.IN_PROGRESS]: "In Progress",
  [Status.COMPLETED]: "Completed",
};

const TICKET_API_URL = "http://localhost:5000/api/tickets";

export const KanbanBoard: React.FC = () => {
  const { data: tickets, setRefresh } = useAxios<Ticket[]>(TICKET_API_URL);

  const handleTicketCreated = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <div className="flex h-full w-full gap-4 overflow-scroll p-12">
        {Object.values(Status).map((status) => (
          <Column
            key={status}
            title={titleMapper[status]}
            status={status}
            tickets={tickets}
            onTicketCreated={handleTicketCreated}
          />
        ))}
      </div>
    </div>
  );
};
