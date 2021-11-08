export function SetLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function GetLocalStorage(key) {
  return localStorage.getItem(key);
}
