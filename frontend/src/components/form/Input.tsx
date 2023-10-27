export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      <input
        className="w-full block rounded-sm outline-none px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 bg-zinc-600"
        {...props}
      />
      {error && (
        <span className="block pt-1 text-xs text-red-300">{error}</span>
      )}
    </div>
  );
}
