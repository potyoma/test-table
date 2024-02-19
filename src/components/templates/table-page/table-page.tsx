import { useCallback, useMemo, useState } from "react";
import { Heading } from "../../atoms/heading/heading";
import Table from "../../organisms/table";
import type { Column, Row } from "../../organisms/table/types";
import EditModal, { type EditForm } from "../../organisms/edit-modal";
import Button from "../../atoms/button";
import { Search } from "../../molecules/search/search";
import { filterStrings } from "../../../utils/filter-strings";

type TablePageProps<T> = {
  data: T[];
  columns: Column<T>[];
  onSaveRow?: (model: T, row: EditForm) => void;
  title: string;
};

export function TablePage<T>({
  data,
  columns,
  onSaveRow,
  title,
}: TablePageProps<T>) {
  const [currentRow, setCurrentRow] = useState<T>();
  const [queue, setQueue] = useState<string>();

  const handleEdit = useCallback((row: T) => () => setCurrentRow(row), []);

  const handleClose = useCallback(() => setCurrentRow(undefined), []);

  const extendedColumns: Column<T>[] = useMemo(
    () => [
      ...columns,
      {
        name: "edit",
        title: "Edit",
        cell: (row: T) => <Button onClick={handleEdit(row)}>Edit</Button>,
      },
    ],
    [columns, handleEdit]
  );

  const handleQueueChange = (queue?: string) => setQueue(queue);

  const filteredData = filterStrings(data as object[], queue);

  const handleSubmit = (model: T, row: EditForm) => {
    onSaveRow?.(model, row);
    setCurrentRow(undefined);
  };

  return (
    <div className="flex flex-col gap-6 justify-center p-10">
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <Heading level="h1">{title}</Heading>
        <Search onChange={handleQueueChange} />
      </div>
      <Table
        columns={extendedColumns}
        className="rounded-lg border-separate border-t"
        headerClassName="py-2 px-4 text-start bg-blue-300 border border-blue-100"
        cellClassName="py-2 px-4 text-start"
        rowClassName="bg-blue-100 even:bg-blue-200"
        data={filteredData as Row<T>[]}
      />
      <EditModal
        onClose={handleClose}
        model={currentRow}
        isOpen={!!currentRow}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
