import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchNote: (search: string) => void;
  text: string;
}
export default function SearchBox({ searchNote, text }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchNote(event.target.value.trim());
  };

  return (
    <>
      <input
        defaultValue={text}
        className={css.input}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
