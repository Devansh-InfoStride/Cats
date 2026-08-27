interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast animate-fade-in" onClick={onClose}>
        <span>🐾</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
