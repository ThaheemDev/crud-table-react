import { useState } from "react";
import {
  useForm,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
  UseFormClearErrors,
  DefaultValues,
} from "react-hook-form";
import toast from "react-hot-toast";
import { fetchRequest } from "../utils/fetch";

export type ViewContentPropsType<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  isLoading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  clearErrors: UseFormClearErrors<T>;
  defaultValue?: DefaultValues<T> | undefined;
};

export const useCrudForm = <T extends FieldValues>({
  url,
  callBackFunction,
  isEditAble,
  defaultValue,
}: {
  url: string;
  callBackFunction?: () => void;
  isEditAble?: boolean;
  defaultValue?: DefaultValues<T> | undefined;
}) => {
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    clearErrors,
  } = useForm<T>({ defaultValues: defaultValue });

  const handleOnSubmit = (data: T) => {
    setLoading(true);
    toast
      .promise(
        fetchRequest<T, { message: string }>({
          url,
          type: isEditAble ? "put" : "post",
          body: data,
        }),
        {
          loading: "Loading...",
          success: (e) => {
            reset();
            callBackFunction?.();
            setIsCreate(false);
            return e.message;
          },
          error: (err) => err.response.data.message,
        }
      )
      .finally(() => setLoading(false));
  };

  return {
    isCreate,
    setIsCreate,
    loading,
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    getValues,
    handleOnSubmit,
    watch,
    clearErrors,
  };
};
