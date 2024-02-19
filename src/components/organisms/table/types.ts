import type { ReactNode } from "react";

export type Column<T> = {
  name: string;
  title?: string;
  columns?: Column<T>[];
  cell?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type ColumnScope = "colgroup" | "col";

export type RawColumn = {
  name: string;
  title?: string;
  scope: ColumnScope;
  colSpan?: number;
  rowSpan?: number;
  headerClassName?: string;
};

export type Row<T> = T & {
  colKey?: string;
  id: string;
};

export type Data<T> = Row<T>[];
