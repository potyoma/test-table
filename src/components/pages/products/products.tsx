import { useMemo } from "react";
import { PRODUCTS } from "../../../data/products";
import { Product } from "../../../lib/types/product";
import type { Column } from "../../organisms/table/types";
import { TablePage } from "../../templates/table-page/table-page";
import { EditForm } from "../../organisms/edit-modal";
import { updateObject } from "../../../utils/update-object";
import { replaceWith } from "../../../utils/replace-with";

export function ProductsPage() {
  const columns: Column<Product>[] = useMemo(
    () => [
      { name: "id", title: "Id" },
      { name: "name", title: "Name" },
      {
        name: "options",
        title: "Options",
        columns: [
          { name: "size", title: "Size" },
          { name: "amount", title: "Amount" },
        ],
      },
      { name: "active", title: "Active" },
      { name: "createdAt", title: "Date" },
    ],
    []
  );

  const handleSaveRow = (model: Product, values: EditForm) => {
    const updated = updateObject(model, values);
    replaceWith(PRODUCTS, updated, prod => prod.id === model.id);
  };

  return (
    <TablePage
      columns={columns}
      data={PRODUCTS}
      onSaveRow={handleSaveRow}
      title="Products"
    />
  );
}
