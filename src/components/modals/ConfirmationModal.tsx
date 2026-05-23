'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  variant = 'primary',
  loading = false,
}: ConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="400px">
      <p className="text-[16px] text-[#40493D] mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="outline" size="md" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={variant} size="md" loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
