export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function setUser(user: object) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isOnboarded");
  document.cookie = "token=; Path=/; Max-Age=0; SameSite=Lax";
}

export function setOnboardingStatus(status: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("isOnboarded", JSON.stringify(status));
}

export function getOnboardingStatus(): boolean {
  if (typeof window === "undefined") return false;
  const status = localStorage.getItem("isOnboarded");
  return status ? JSON.parse(status) : false;
}

export function setLastScreeningInputs(inputs: object): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("lastScreeningInputs", JSON.stringify(inputs));
}

export function getLastScreeningInputs<
  T = Record<string, unknown>,
>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("lastScreeningInputs");
  return raw ? (JSON.parse(raw) as T) : null;
}
