import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrolled } from './ui/hooks';

const NAV_LINKS = [
    { label: 'About',     href: '#about' },
    { label: 'Skills',    href: '#skills' },
    { label: 'Projects',  href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Organisasi', href: '#organization' },
    { label: 'Sertifikasi', href: '#/sertifikasi' },
    { label: 'CV',         href: '#/cv' },
    { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;

        const onKey = (e) => e.key === 'Escape' && close();
        const onResize = () => window.matchMedia('(min-width: 768px)').matches && close();

        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);

        const prevOverflow = document.body.style.overflow;
        const prevPosition = document.body.style.position;
        const prevTop = document.body.style.top;
        const prevWidth = document.body.style.width;
        const scrollY = window.scrollY;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
            document.body.style.overflow = prevOverflow;
            document.body.style.position = prevPosition;
            document.body.style.top = prevTop;
            document.body.style.width = prevWidth;
            window.scrollTo(0, scrollY);
        };
    }, [open, close]);

    return (
        <>
            <header className={`pf-nav ${scrolled ? 'is-scrolled' : ''}`}>
                <a href="#top" className="pf-nav-mark">Naufal</a>

                {/* desktop */}
                <nav className="hidden md:block" aria-label="Navigasi utama">
                    {NAV_LINKS.map((l) => (
                        <a key={l.href} href={l.href}>{l.label}</a>
                    ))}
                </nav>

                {/* mobile toggle */}
                <button
                    className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 z-10"
                    aria-label={open ? 'Tutup menu' : 'Buka menu'}
                    aria-expanded={open}
                    aria-controls="menu-mobile"
                    onClick={() => setOpen(!open)}
                >
                    <span
                        className={`block w-[22px] h-[2px] bg-ink transition-transform duration-200 ${
                            open ? 'translate-y-[7px] rotate-45' : ''
                        }`}
                    />
                    <span
                        className={`block w-[22px] h-[2px] bg-ink transition-opacity duration-200 ${
                            open ? 'opacity-0' : ''
                        }`}
                    />
                    <span
                        className={`block w-[22px] h-[2px] bg-ink transition-transform duration-200 ${
                            open ? '-translate-y-[7px] -rotate-45' : ''
                        }`}
                    />
                </button>
            </header>

            {/* mobile overlay — rendered via portal so `backdrop-filter`
                on the sticky header can't trap the `fixed` positioning */}
            {open &&
                createPortal(
                    <nav
                        id="menu-mobile"
                        className="pf-nav-mobile fixed inset-0 bg-deep/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden z-50"
                        aria-label="Navigasi utama"
                    >
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="font-display text-2xl tracking-wide"
                                onClick={close}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>,
                    document.body,
                )}
        </>
    );
}