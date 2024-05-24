import React from "react"; 
import CrudAction from "./CrudAction";
import { DefaultValues, FieldValues } from "react-hook-form";
import { ViewContentPropsType } from "./../hooks/useCrudForm";

interface TableRowColumn {
  label: string;
  key: string;
  width?: string;
}

interface TableProps<T extends FieldValues> {
  data: { [key: string]: string | React.ReactElement | any }[];
  column: TableRowColumn[];
  title?: string;
  isAddable?: string;
  viewContent?: (props: ViewContentPropsType<T>) => React.ReactNode;
  modelTitle?: string;
  callBackFunction?: () => void;
  action?: {
    edit?: {
      url: string;
      data: T | unknown;
    };
    delete?: string;
  };
}

const Table = <T extends FieldValues>({
  column,
  data,
  title,
  isAddable,
  viewContent,
  modelTitle,
  callBackFunction,
  action,
}: TableProps<T>) => {
  const columnsData = action
    ? column.concat([{ label: "Action", key: "action" }])
    : column;

  const rowsData = action
    ? data.map((item) => ({
        ...item,
        action: (
          <div className="flex gap-3">
            {viewContent ? (
              <CrudAction<T>
                isCreateAble={false}
                viewContent={viewContent}
                callBackFunction={callBackFunction}
                modelTitle={modelTitle}
                actions={action}
                defaultValue={item as DefaultValues<T>}
              />
            ) : null}
          </div>
        ),
      }))
    : data;
  return (
    <div>
      <div>
        <div className="flex justify-between px-4">
          <div className="capitalize">{title ?? "No Title"}</div>
          {viewContent ? (
            <CrudAction<T>
              isCreateAble={!!isAddable}
              fetchUrl={isAddable}
              viewContent={viewContent}
              callBackFunction={callBackFunction}
              modelTitle={title ?? modelTitle}
            />
          ) : null}
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr className="bg-muted font-bold">
              {columnsData?.map((col, index) => (
                <th key={index} style={{ width: col.width || "auto" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsData?.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columnsData?.map((col, colIndex) => (
                  <td key={colIndex}>
                    {item[col.key as keyof typeof item]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
