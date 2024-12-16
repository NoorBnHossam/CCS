import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        // In a real app, you'd use proper routing
        console.log('Navigate to:', href);
      }}
    >
      {children}
    </a>
  );
}