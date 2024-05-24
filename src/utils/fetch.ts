import axios from "axios";

 

interface fetchRequestTypes<bodyType> {
  url: string;
  type?: "get" | "post" | "patch" | "put" | "delete";
  body?: bodyType;
  query?: { [key: string]: string | unknown };
  token?: string;
}

export const fetchRequest = async <BodyType, ResponseType>({
  url,
  type = "get",
  body,
  query,
  token,
}: fetchRequestTypes<BodyType>) => {
  let res: ResponseType;
  const config: object = token ? { Authorization: `Bearer ${token}` } : {};

  switch (type) {
    case "get":
      res = await axios.get(url, { params: { ...query }, ...config });
      break;
    case "post":
      res = await axios.post(url, body, { params: { ...query }, ...config });
      break;
    case "patch":
      res = await axios.patch(url, body, { params: { ...query } });
      break;
    case "delete":
      res = await axios.delete(url);
      break;
    default:
      throw new Error(`Invalid request type: ${type}`);
  }
  return res;
};
