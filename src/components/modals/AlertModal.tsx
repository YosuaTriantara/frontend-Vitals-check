'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export default function AlertModal({
  open,
  onClose,
  title,
  message,
  variant = 'info',
}: AlertModalProps) {
  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
  const colors = {
    success: 'text-[#126D27]',
    error:   'text-[#BA1A1A]',
    warning: 'text-[#9A3412]',
    info:    'text-[#40493D]',
  };

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="400px">
      <div className="flex flex-col items-center gap-4 text-center py-2">
        <div className={`text-4xl font-bold ${colors[variant]}`}>
          {icons[variant]}
        </div>
        <p className="text-[16px] text-[#40493D]">{message}</p>
        <Button variant="primary" size="md" onClick={onClose} className="mt-2">
          Mengerti
        </Button>
      </div>
    </Modal>
  );
}
