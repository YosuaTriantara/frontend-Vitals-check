export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function setUser(user: object) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function setOnboardingStatus(status: boolean) {
  localStorage.setItem('isOnboarded', JSON.stringify(status));
}

export function getOnboardingStatus(): boolean {
  const status = localStorage.getItem('isOnboarded');
  return status ? JSON.parse(status) : false;
}