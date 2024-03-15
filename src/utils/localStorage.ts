export function saveItemToStorage<T>(key: string, item: T): void {
  try {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(key, serializedItem);
  } catch (error) {
    console.log(
      `Unexpected error while saving ${item} to local storage:\n${error}`
    );
  }
}

export function loadItemFromStorage<T>(key: string): T | null {
  const serializedState = localStorage.getItem(key);
  if (!serializedState) {
    return null;
  }

  try {
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.log(
      `Unexpected error while loading ${key} key from local storage:\n${error}`
    );
    return null;
  }
}
