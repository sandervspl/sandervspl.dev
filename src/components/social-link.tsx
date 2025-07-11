type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function SocialLink({ href, icon, label }: Props) {
  return (
    <li className="hover:bg-neutral-100 dark:hover:bg-neutral-800! transition p-2 -ml-2 rounded-lg">
      <a href={href} className="flex gap-1.5 items-center text-sm" target="_blank" rel="noreferrer">
        {icon}
        {label}
      </a>
    </li>
  );
}
