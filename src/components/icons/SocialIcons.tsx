type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export function XIcon({ className = "h-4 w-4", ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4", ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
      <path d="M24 12a12 12 0 1 0-13.875 11.854V15.47H7.078V12h3.047V9.356c0-3.008 1.79-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953h-1.514c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.47h-2.796v8.384A12.003 12.003 0 0 0 24 12" />
    </svg>
  );
}
