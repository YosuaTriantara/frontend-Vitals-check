'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { validateRegister } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

export default function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateRegister(form);
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }
    setErrors({});
    setApiError('');
    setLoading(true);
    try {
      await register(form);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? 'Registrasi gagal. Coba lagi.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && <Alert variant="error">{apiError}</Alert>}
      <Input
        label="Nama Lengkap"
        type="text"
        placeholder="Nama Anda"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="nama@email.com"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Min. 6 karakter"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        error={errors.password}
      />
      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
        Buat Akun
      </Button>
      <p className="text-center text-[14px] text-[#40493D]">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-[#0F6D2B] font-semibold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
