import { useMemo } from "react";
import { TablePage } from "../../templates/table-page/table-page";
import type { Column } from "../../organisms/table/types";
import type { PricePlan } from "../../../lib/types/price-plan";
import { PRICE_PLANS } from "../../../data/price-plans";
import { EditForm } from "../../organisms/edit-modal";
import { updateObject } from "../../../utils/update-object";
import { replaceWith } from "../../../utils/replace-with";

export function PricePlansPage() {
  const columns: Column<PricePlan>[] = useMemo(
    () => [
      { name: "id", title: "Id" },
      { name: "description", title: "Description" },
      { name: "active", title: "Active" },
      { name: "createdAt", title: "Date created" },
      { name: "removedAt", title: "Date removed" },
    ],
    []
  );

  const handleSaveRow = (model: PricePlan, values: EditForm) => {
    const updated = updateObject(model, values);
    replaceWith(PRICE_PLANS, updated, pp => pp.id === model.id);
  };

  return (
    <TablePage
      title="Price plans"
      columns={columns}
      data={PRICE_PLANS}
      onSaveRow={handleSaveRow}
    />
  );
}
