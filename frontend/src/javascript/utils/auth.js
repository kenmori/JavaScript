export function transitionAuthenticatedStatus() {
  localStorage.setItem("isLoggedIn", true);
}

export function transitionUnAuthenticatedStatus() {
  localStorage.setItem("isLoggedIn", false);
}

export function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}
