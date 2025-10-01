'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/Restaurant', label: 'Restaurant' },
    { href: '/Patisserie', label: 'Pâtisserie' },
    { href: '/Formations', label: 'Formations' },
    { href: '/Evenement', label: 'Événement' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-white text-sm px-4">
      {links.map(({ href, label }) => {
        const isActive =
          pathname === href ||
          (href === '/Evenement' && pathname.startsWith('/Evenement/'));

        return (
          <Link
            key={href}
            href={href}
            className={`relative group block px-2 py-1 transition-colors duration-300 ${
              isActive ? 'text-[#FFBB00]' : 'text-white hover:text-[#FFBB00]'
            }`}
          >
            {label}

            {/* Ligne visible si active */}
            <span
              className={`absolute left-0 -bottom-0.5 h-[1.3px] bg-white w-full transition-all duration-300`}
            />
            <span
              className={`absolute left-0 -bottom-0.5 h-[1.3px] bg-[#FFBB00] transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
