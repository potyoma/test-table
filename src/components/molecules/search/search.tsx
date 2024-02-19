import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import { ChangeEvent } from "react";

type SearchProps = {
  onChange?: (queue: string) => void;
};

export function Search({ onChange }: SearchProps) {
  const handleChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value),
    300
  );

  return (
    <div className="relative w-fit">
      <input
        className="p-2 border border-slate-500 rounded-lg"
        placeholder="Type to search"
        onChange={handleChange}
      />
      <FontAwesomeIcon
        className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500"
        icon={faSearch}
      />
    </div>
  );
}
