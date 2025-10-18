import { encrypt, decrypt } from "./encryption";

export const SECRETKEY = import.meta.env.VITE_SECRET_KEY;
export interface ProtectedLocalStorageProps {
  getItemAsync: (key: string, secretKey: string) => Promise<string | null>;
  setItemAsync: (
    key: string,
    value: string,
    secretKey: string
  ) => Promise<void>;
  removeItemAsync: (key: string, secretKey: string) => Promise<void>;
  clear: () => void;
}

window.protectedLocalStorage = {
  getItemAsync: getItemAsync,
  setItemAsync: setItemAsync,
  removeItemAsync: removeItemAsync,
  clear: clear,
};

async function getDeterministicIv(key: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hashBuffer);
  const iv = hashArray.slice(0, 12);
  return iv;
}

export async function getItemAsync(key: string, secretKey: string) {
  const iv = await getDeterministicIv(key);
  const encryptedKey: string = await encrypt(key, secretKey, iv);

  const data = localStorage.getItem(encryptedKey);

  if (!data) {
    return null;
  }

  const decryptedData = await decrypt(data, secretKey);
  return decryptedData;
}

export async function setItemAsync(
  key: string,
  value: string,
  secretKey: string
) {
  const iv = await getDeterministicIv(key);
  const encryptedKey: string = await encrypt(key, secretKey, iv);
  const encryptedValue: string = await encrypt(value, secretKey);

  localStorage.setItem(encryptedKey, encryptedValue);
}

export async function removeItemAsync(key: string, secretKey: string) {
  const iv = await getDeterministicIv(key);
  const encryptedKey: string = await encrypt(key, secretKey, iv);
  localStorage.removeItem(encryptedKey);
}

export function clear() {
  localStorage.clear();
}
