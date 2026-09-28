import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  onboarding: "troca-verde:onboarding-seen",
  sessionUser: "troca-verde:session-user",
  users: "troca-verde:users",
  entries: "troca-verde:entries",
};

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    return fallback;
  }
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // no-op for storage failures in this prototype
  }
}
