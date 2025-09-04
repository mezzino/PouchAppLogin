import * as SecureStore from "expo-secure-store";

export async function saveSecure(key: string, value: string) {
  await SecureStore.setItemAsync(key, value, { keychainService: "pouch" });
}

export async function getSecure(key: string) {
  return SecureStore.getItemAsync(key, { keychainService: "pouch" });
}

export async function delSecure(key: string) {
  await SecureStore.deleteItemAsync(key, { keychainService: "pouch" });
}
