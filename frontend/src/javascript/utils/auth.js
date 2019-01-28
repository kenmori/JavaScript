export function putToken(token) {
  localStorage.setItem("jwt", token);
}

export function removeToken() {
  localStorage.removeItem("jwt");
}

export function getToken() {
  return localStorage.getItem("jwt");
}

export function isAuthenticated() {
  return !!localStorage.getItem("jwt");
}
