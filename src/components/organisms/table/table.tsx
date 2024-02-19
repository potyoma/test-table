import { useMemo } from "react";

import type { Column, Data, Row } from "./types";
import { buildColumnTree, flatColumns, flatObject } from "./utils";
import clsx from "clsx";

type TableProps<T> = {
  columns: Column<T>[];
  data?: Data<T>;
  headerClassName?: string;
  cellClassName?: string;
  className?: string;
  rowClassName?: string;
};

export function Table<T>({
  columns,
  data,
  className,
  headerClassName,
  cellClassName,
  rowClassName,
}: TableProps<T>) {
  const headers = useMemo(() => buildColumnTree(columns), [columns]);

  const flattedColumns = useMemo(() => flatColumns(columns), [columns]);

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border",
        className
      )}
    >
      <table>
        <thead>
          {headers?.map((h, i) => (
            <tr key={i}>
              {h.map(header => (
                <th
                  key={header.name}
                  colSpan={header.colSpan}
                  rowSpan={header.rowSpan}
                  scope={header.scope}
                  className={clsx(headerClassName, header.headerClassName)}
                >
                  {header.title ?? header.name}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data?.map(row => {
            const flatRow = flatObject(row) as Record<string, Row<T>>;
            return (
              <tr key={row.id} className={rowClassName}>
                {Object.entries(flattedColumns).map(([key, cell], i) => {
                  const cellValue = flatRow[key];
                  return (
                    <td
                      key={`${flatRow.id}.${i}`}
                      className={clsx(cellClassName, cell.cellClassName)}
                    >
                      {cell.cell?.(row) ?? cellValue?.toString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
