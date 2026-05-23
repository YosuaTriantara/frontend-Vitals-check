import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = { title: 'Daftar — VitalsCheck' };

export default function RegisterPage() {
  return (
    <AuthLayout title="Buat Akun" subtitle="Bergabung dan mulai pantau kesehatan Anda.">
      <RegisterForm />
    </AuthLayout>
  );
}
