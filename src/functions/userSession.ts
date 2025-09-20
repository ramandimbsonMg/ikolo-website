export function storeSessionDetails(details: any) {
  localStorage.setItem("session", JSON.stringify(details));
}

export function removeSessionDetails() {
  localStorage.removeItem("session");
}
