import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import type { CreateNoteProps, NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";
interface NoteFormProps {
  onClose: () => void;
}
import * as Yup from "yup";
import { createNote } from "@/lib/api";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});
export default function NoteForm({ onClose }: NoteFormProps) {
  const initialValues: CreateNoteProps = {
    title: "",
    content: "",
    tag: "" as NoteTag,
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (
    values: CreateNoteProps,
    FormikHelpers: FormikHelpers<CreateNoteProps>,
  ) => {
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    FormikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending ? true : false}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
