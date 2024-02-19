import { addParentToKey } from "../../../utils/parented-key";
import type { Column, RawColumn } from "./types";

const walk =
  (
    fn: <T>(node: Column<T>, level: number, span: number) => void,
    level = 0,
    addSpan?: (span: number) => void
  ) =>
  <T>(node: Column<T>) => {
    let span = 0;

    if (node.columns) {
      node.columns.forEach(
        walk(fn, level + 1, sp => addSpan?.(sp) ?? (span += sp))
      );
      const count = node.columns.filter(c => !c.columns).length;
      span += count;
      addSpan?.(count);
    }

    fn(node, level, span);
  };

const getDepth = <T>(column: Column<T>) => {
  let depth = 0;

  if (column.columns) {
    column.columns.forEach(d => {
      const tmpDepth = getDepth(d);
      if (tmpDepth > depth) {
        depth = tmpDepth;
      }
    });
  }

  return 1 + depth;
};

const getMaxDepth = <T>(columns: Column<T>[]) => {
  const depths = columns.map(x => getDepth(x));
  return Math.max(...depths);
};

export const buildColumnTree = <T>(columns: Column<T>[]): RawColumn[][] => {
  const tree: RawColumn[][] = [];
  const depth = getMaxDepth(columns);

  columns.forEach(
    walk((node, level: number, span) => {
      if (!tree[level]) {
        tree[level] = [];
      }

      tree[level].push({
        ...node,
        scope: span > 0 ? "colgroup" : "col",
        colSpan: span,
        rowSpan: (!span && depth - level > 1 && depth - level) || undefined,
      });
    })
  );

  return tree;
};

export const flatColumns = <T>(
  columns: Column<T>[],
  parent = ""
): Record<string, Column<T>> => {
  let res: Record<string, Column<T>> = {};

  columns.forEach(col => {
    if (col.columns) {
      const childColumns = flatColumns(
        col.columns,
        addParentToKey(col.name, parent)
      );
      res = {
        ...res,
        ...childColumns,
      };

      return;
    }

    res[addParentToKey(col.name, parent)] = col;
  });

  return res;
};

export const flatObject = (
  obj: object,
  parent = ""
): Record<string, unknown> => {
  let res: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value) {
      res = { ...res, ...flatObject(value, addParentToKey(key, parent)) };
      return;
    }

    res[addParentToKey(key, parent)] = value;
  });

  return res;
};
