import { CreateNoteProps, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/"

interface fetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes =  async (page:number = 1, search:string) => {
    const res =  await axios.get<fetchNotesResponse>("/notes", {
        params: {
            page,
            search,
            perPage:12
        },
        headers: {
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })

    return res.data
 };

// POST Requerts
export const createNote =  async (newNote: CreateNoteProps) => { 
    const res = await axios.post<Note>("/notes", newNote,  {
        
        headers: {
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }

        
    })
    return res.data
};


// DELETE Request

export const deleteNote = async (id: string) => {
    const res = await axios.delete<Note>(`/notes/${id}`, {
         headers: {
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }

    })
return res.data
};

export const fetchNotesById =  async (id: string) => {
    const res =  await axios.get<Note>(`/notes/${id}`, {
     
        headers: {
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    })

    return res.data
}