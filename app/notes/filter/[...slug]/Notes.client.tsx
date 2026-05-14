"use client";
import { useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import css from "../NotesPage.module.css";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}
export default function NotesClient({ category }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  // use query
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["notes", page, search, category],
    queryFn: () => fetchNotes(page, search, category),
    placeholderData: keepPreviousData,
  });
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  });

  console.log(data);
  const modalOpen = () => setIsOpenModal(true);
  const modalClose = () => setIsOpenModal(false);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox text={search} searchNote={handleSearch} />
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        {/* Кнопка створення нотатки */}
        <button onClick={modalOpen} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading data.....</p>}
      {isError && <p>Error!!!!</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={modalClose}>
          <NoteForm onClose={modalClose} />
        </Modal>
      )}
    </div>
  );
}
