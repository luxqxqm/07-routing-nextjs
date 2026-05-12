"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNotesById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  const handleBack = () => router.back();
  return (
    <Modal onClose={handleBack}>
      {isLoading && <p>Loading data.....</p>}
      {isError && <p>Error!!!!</p>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>{data.tag}</p>
          <p>{data.createdAt}</p>
          <button onClick={handleBack}>Close</button>
        </>
      )}
    </Modal>
  );
}
