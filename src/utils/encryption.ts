export async function encrypt(
  text: string,
  keyString: string,
  iv?: Uint8Array
): Promise<string> {
  const key = await getKey(keyString);
  const encoder = new TextEncoder();
  const finalIv = new Uint8Array(
    iv || crypto.getRandomValues(new Uint8Array(12))
  );

  const data = new Uint8Array(encoder.encode(text));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: finalIv },
    key,
    data
  );

  const result = new Uint8Array([...finalIv, ...new Uint8Array(encrypted)]);
  const encoded = btoa(String.fromCharCode.apply(null, Array.from(result)));
  return encoded;
}

export async function decrypt(
  encryptedText: string,
  keyString: string
): Promise<string> {
  const key = await getKey(keyString);
  const data = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
  const iv = new Uint8Array(data.slice(0, 12));
  const encrypted = new Uint8Array(data.slice(12));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  const result = new TextDecoder().decode(decrypted);
  return result;
}

async function getKey(keyString: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyString);
  const keyHash = await crypto.subtle.digest("SHA-256", keyData);
  return await crypto.subtle.importKey(
    "raw",
    keyHash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}
