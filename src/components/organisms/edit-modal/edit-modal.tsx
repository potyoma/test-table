import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import Modal from "../modal";
import { keepStringOnly } from "./utils";
import { Heading } from "../../atoms/heading/heading";
import Input from "../../molecules/input";
import { ReactNode, useEffect, useMemo } from "react";
import { addParentToKey } from "../../../utils/parented-key";
import Button from "../../atoms/button";

export type EditForm = Record<string, string | Record<string, string>>;

type EditModalProps<T> = {
  isOpen?: boolean;
  onClose: () => void;
  model?: T;
  onSubmit?: (model: T, values: EditForm) => void;
};

const renderFormEntries = (
  fields: object,
  register: UseFormRegister<EditForm>,
  parent = ""
): ReactNode[] =>
  Object.entries(fields)
    .map(([key, value]) => {
      const keyWithParent = addParentToKey(key, parent);
      return typeof value === "string" ? (
        <Input
          key={keyWithParent}
          label={keyWithParent}
          {...register(keyWithParent)}
        />
      ) : (
        renderFormEntries(value, register, keyWithParent)
      );
    })
    .flat();

export function EditModal<T>({
  onClose,
  isOpen,
  model,
  onSubmit,
}: EditModalProps<T>) {
  const defaultValues = useMemo(() => keepStringOnly(model ?? {}), [model]);

  const { register, handleSubmit, reset } = useForm<EditForm>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleFormSubmit: SubmitHandler<EditForm> = values =>
    onSubmit?.(model!, values);

  return (
    <Modal
      title={<Heading level="h3">Edit</Heading>}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className="flex flex-col gap-3 mt-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {renderFormEntries(defaultValues, register)}
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
}
