export function SetLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function GetLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
    ? JSON.parse(localStorage.getItem(key)) : [];
}
