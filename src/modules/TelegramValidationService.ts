import { isTMA, initData, type User } from "@telegram-apps/sdk";

type TelegramValidationResponse = {
  isValid: boolean;
  fields: Record<string, string>;
  error?: string | null;
};

const TELEGRAM_VALIDATION_URL = "https://beta.graff.tech/api/telegram/validate";

export async function validateTelegramAndPersistAccountAsync(): Promise<boolean> {
  try {
    if (!isTMA()) {
      return false;
    }

    initData.restore();
    const rawInitData = initData.raw();
    const user = (initData.user() as User) ?? undefined;

    if (!rawInitData || !user) {
      console.error("Telegram init data is missing or user undefined");
      return false;
    }

    const controller = new AbortController();
    const response = await fetch(TELEGRAM_VALIDATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: rawInitData }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`Validation request failed with status ${response.status}`);
      return false;
    }

    const validation: TelegramValidationResponse = await response.json();
    if (!validation.isValid) {
      console.error(validation.error ?? "Telegram init data validation failed");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to validate Telegram init data", error);
    return false;
  }
}
