import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = { title: 'Masuk — VitalsCheck' };

export default function LoginPage() {
  return (
    <AuthLayout title="Selamat Datang" subtitle="Masuk untuk melanjutkan skrining kesehatan Anda.">
      <LoginForm />
    </AuthLayout>
  );
}
