import { Status, Ticket } from "../types";

export const DropIndicator = ({
  beforeId,
  status,
}: {
  beforeId: string | null;
  status: Status;
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={status}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

export const Card = (
  props: Ticket & {
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: Ticket) => void;
  }
) => {
  const { _id, status, title, handleDragStart } = props;
  return (
    <>
      <DropIndicator beforeId={_id} status={status} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, _id, status })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};
