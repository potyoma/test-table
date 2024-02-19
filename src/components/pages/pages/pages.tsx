import { useMemo } from "react";
import { TablePage } from "../../templates/table-page/table-page";
import { Column } from "../../organisms/table/types";
import { Page } from "../../../lib/types/page";
import { PAGES } from "../../../data/pages";
import { updateObject } from "../../../utils/update-object";
import { EditForm } from "../../organisms/edit-modal";
import { replaceWith } from "../../../utils/replace-with";

export function PagesPage() {
  const columns: Column<Page>[] = useMemo(
    () => [
      { name: "id", title: "Id" },
      { name: "title", title: "Title" },
      { name: "active", title: "Active" },
      { name: "updatedAt", title: "Last updated" },
      { name: "publishedAt", title: "Date published" },
    ],
    []
  );

  const handleSaveRow = (model: Page, values: EditForm) => {
    const updated = updateObject(model, values);
    replaceWith(PAGES, updated, p => p.id === model.id);
  };

  return (
    <TablePage
      columns={columns}
      data={PAGES}
      title="Pages"
      onSaveRow={handleSaveRow}
    />
  );
}
