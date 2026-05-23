'use client';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export function useNavigation() {
  const pathname = usePathname();

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    isActive:
      pathname === item.href || pathname.startsWith(item.href + '/'),
  }));

  const activeItem = items.find((i) => i.isActive) ?? null;

  return { items, activeItem, pathname };
}
