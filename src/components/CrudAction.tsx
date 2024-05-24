import { Edit, Plus, Trash } from "lucide-react";
import Modal from "./Modal";
import { ViewContentPropsType, useCrudForm } from "./../hooks/useCrudForm";
import { DefaultValues, FieldValues } from "react-hook-form";

interface PropsType<T extends FieldValues> {
  isCreateAble?: boolean;
  fetchUrl?: string;
  viewContent: (props: ViewContentPropsType<T>) => React.ReactNode;
  callBackFunction?: () => void;
  modelTitle?: string;
  actions?: {
    edit?: {
      url: string;
      data: T | unknown;
    };
    delete?: string;
  };
  defaultValue?: DefaultValues<T> | undefined;
}

const CrudAction = <T extends FieldValues>({
  isCreateAble,
  fetchUrl,
  viewContent,
  callBackFunction,
  modelTitle,
  actions,
  defaultValue,
}: PropsType<T>) => {
  const {
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
  } = useCrudForm<T>({
    url: actions?.edit?.url ?? fetchUrl ?? "",
    callBackFunction,
    isEditAble: actions?.edit ? true : false,
    defaultValue,
  });

  return (
    <>
      {isCreateAble && !actions && (
        <button onClick={() => setIsCreate(true)}>
          <Plus className="h-4 w-4" />
        </button>
      )}
      {actions && !isCreateAble && (
        <div className="flex gap-3">
          {actions.edit && (
            <button
              onClick={() => {
                console.log("Edit", defaultValue);
                setIsCreate(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          {actions.delete && (
            <button
              className="shadow-red bg-red-600 hover:bg-red-500 "
              onClick={() => console.log("Delete")}
            >
              <Trash className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      {isCreateAble && actions && (
        <div className="text-red-500">
          You can't create and edit at the same time
        </div>
      )}
      {isCreate && (
        <Modal
          onClose={() => {
            setIsCreate(false);
            reset();
          }}
          isHeader={!!modelTitle}
          headerTitle={modelTitle}
        >
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            autoComplete="off"
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] md:min-w-[400px] bg-white rounded-lg overflow-y-auto"
          >
            {viewContent({
              handleSubmit,
              isLoading: loading,
              register,
              errors,
              setValue,
              getValues,
              watch,
              clearErrors,
              defaultValue,
            })}
          </form>
        </Modal>
      )}
    </>
  );
};

export default CrudAction;
