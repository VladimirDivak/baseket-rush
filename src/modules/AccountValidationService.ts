import { getItemAsync, SECRETKEY } from "../utils/protectedLocalStorage";

export async function validateAcountAsync(): Promise<boolean> {
  const data = await getItemAsync("account", SECRETKEY);
  return data != null;
}
