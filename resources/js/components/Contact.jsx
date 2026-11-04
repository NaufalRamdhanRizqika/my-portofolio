import Reveal from './ui/Reveal';

const LINKS = [
    { label: 'naufalrizqika@gmail.com', href: 'mailto:naufalrizqika@gmail.com' },
    { label: '0851-5968-2991', href: 'tel:085159682991' },
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export default function Contact() {
    return (
        <Reveal as="section" id="contact" className="pf-contact">
            <h2 className="pf-h-ripple font-display">
                Contact
                <span className="pf-ripple" aria-hidden="true" />
            </h2>
            <p>
                Terbuka untuk diskusi proyek IoT, magang, kolaborasi web, atau riset data.
            </p>

            <div className="pf-reflect-wrap mt-6">
                <div className="pf-reflect-content">
                    {LINKS.map((l) => (
                        <a key={l.label} href={l.href}>{l.label}</a>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}