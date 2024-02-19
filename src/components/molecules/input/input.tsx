import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  forwardRef,
  useId,
} from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ...rest }: InputProps,
  ref
) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-slate-500" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...rest}
        className="border border-slate-700 rounded p-2 active:border-2 active:border-slate-700"
        id={id}
        ref={ref}
      />
    </div>
  );
});
