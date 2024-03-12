import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { ChangeEvent, ReactNode } from "react";

type Props<TFieldValues extends FieldValues> = {
  inputRef?: React.Ref<HTMLInputElement>;
  inputSize?: number | string;
  onChevronPress?: () => void;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;

  iconLeft?: ReactNode;
  marginTop?: number;
  type?: string; // ou qualquer tipo específico do HTMLInputElement
  options?: Record<string, any>; // ou qualquer tipo específico necessário
  includeRawValueInChangeText?: boolean;
  password?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues>;

const Searchbar = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyle,
  iconLeft,
  marginTop,
  type,

  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <>
      <div
        className="bg-white flex-row items-center pl-[4%] w-[100%] rounded-md min-h-14 shadow-default"
        style={{ ...containerStyle, marginTop }}
      >
        {type ? (
          <div
            className="text-xl pl-3 w-[85%]"
            onChange={field.onChange}
            ref={field.ref}
            type={type}
            {...props}
          ></div>
        ) : (
          <div
            className="text-xl pl-3 w-[85%]"
            onChange={field.onChange}
            ref={field.ref}
            onBlur={field.onBlur}
            {...props}
          ></div>
        )}
      </div>
      <div className="text-lg text-red-600 pt-[0.5%] pl-[3%]">
        {error?.message}
      </div>
    </>
  );
};

export default Searchbar;
