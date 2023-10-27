export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded bg-blue-700 px-2 py-1 ${className}`}
    />
  );
}
