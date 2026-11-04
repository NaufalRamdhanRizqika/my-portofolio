import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/projects';
import Reveal from './ui/Reveal';

function ProjectCard({ project, onOpen }) {
    const handleKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(project);
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            aria-label={`Buka detail ${project.title}`}
            onClick={() => onOpen(project)}
            onKeyDown={handleKey}
            className="flex cursor-pointer flex-col rounded-lg border border-[#0f2e29] bg-[#0d2b26]/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#0d2b26]/95 hover:shadow-xl hover:shadow-black/30 focus-visible:outline outline-2 outline-orange-500 outline-offset-2"
        >
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-orange-500">
                {project.category}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">
                {project.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#93b3ac] line-clamp-2">
                {project.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tools.slice(0, 3).map((t) => (
                    <span
                        key={t}
                        className="rounded-full border border-[#d9ede8]/20 bg-[#d9ede8]/5 px-2.5 py-0.5 text-[0.65rem] text-[#d9ede8]"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </article>
    );
}

function ProjectModal({ project, onClose }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement;

        const focusables = () =>
            Array.from(
                dialogRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ) ?? [],
            );

        const onKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;

            const items = focusables();
            if (items.length === 0) return;

            const first = items[0];
            const last = items[items.length - 1];
            const activeEl = document.activeElement;

            if (e.shiftKey && (activeEl === first || !dialogRef.current.contains(activeEl))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && activeEl === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', onKey);

        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        closeRef.current?.focus();

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
            if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="presentation"
        >
            <div
                className="absolute inset-0 bg-[#071513]/85 backdrop-blur-md"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={dialogRef}
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-[#0f2e29] bg-[#0c2a25] p-6 shadow-2xl shadow-black/50 sm:p-7"
                role="dialog"
                aria-modal="true"
                aria-label={`Detail ${project.title}`}
            >
                <button
                    ref={closeRef}
                    onClick={onClose}
                    aria-label="Tutup"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-[#93b3ac] transition-colors hover:border-orange-500/40 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                >
                    ✕
                </button>

                <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-orange-500">
                    {project.category}
                </span>

                <h2 className="mt-3 font-display text-2xl font-bold text-white">
                    {project.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[#d9ede8]">
                    {project.body}
                </p>

                <h3 className="mt-6 font-display text-sm font-semibold text-white">
                    Sorotan
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#93b3ac]">
                    {project.highlights.map((h) => (
                        <li key={h}>{h}</li>
                    ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-[#d9ede8]/20 bg-[#d9ede8]/5 px-3 py-1 text-[0.7rem] text-[#d9ede8]"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default function Projects() {
    const [active, setActive] = useState(null);
    const close = useCallback(() => setActive(null), []);

    return (
        <Reveal as="section" id="projects" className="pf-section">
            <h2 className="pf-h-ripple font-display">
                Projects
                <span className="pf-ripple" aria-hidden="true" />
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} onOpen={setActive} />
                ))}
            </div>

            {active &&
                createPortal(
                    <ProjectModal project={active} onClose={close} />,
                    document.body,
                )}
        </Reveal>
    );
}
