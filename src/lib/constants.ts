import type { RiskCategory } from '@/types/screening';

export const RISK_LABELS: Record<RiskCategory, string> = {
  low:    'Rendah',
  medium: 'Moderat',
  high:   'Tinggi',
};

export const RISK_COLORS: Record<RiskCategory, { text: string; bg: string }> = {
  low:    { text: '#126D27', bg: 'rgba(156,244,156,0.3)' },
  medium: { text: '#126D27', bg: 'rgba(156,244,156,0.3)' },
  high:   { text: '#BA1A1A', bg: 'rgba(255,218,214,0.3)' },
};

export const BMI_RANGES = [
  { label: 'Kurang',    min: 0,        max: 18.49,   color: '#854D0E', bg: '#FEF9C3' },
  { label: 'Normal',   min: 18.5,     max: 24.99,   color: '#0D631B', bg: '#9CF49C' },
  { label: 'Kelebihan',min: 25,       max: 29.99,   color: '#B45309', bg: '#FFEDD5' },
  { label: 'Obesitas', min: 30,       max: Infinity, color: '#BA1A1A', bg: '#FEE2E2' },
] as const;

export const NAV_ITEMS = [
  { label: 'Dashboard',      href: '/dashboard',   icon: '/icons/icon-dashboard.svg' },
  { label: 'Risk Detection', href: '/screening',   icon: '/icons/icon-risk.svg' },
  { label: 'Health Data',    href: '/health-data', icon: '/icons/icon-health-data.svg' },
  { label: 'Pengaturan',     href: '/profile',     icon: '/icons/icon-settings.svg' },
] as const;

export const API_ENDPOINTS = {
  auth: {
    login:    '/auth/login',
    register: '/auth/register',
    me:       '/auth/me',
  },
  users: {
    profile: '/users/profile',
  },
  screenings: {
    list:   '/screenings',
    create: '/screenings',
    byId:   (id: string) => `/screenings/${id}`,
    delete: (id: string) => `/screenings/${id}`,
  },
} as const;
