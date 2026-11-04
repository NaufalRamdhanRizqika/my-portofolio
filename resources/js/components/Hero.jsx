import Koi from './ui/Koi';

export default function Hero() {
    return (
        <section id="top" className="pf-hero">
            <Koi className="koi koi-1" />
            <Koi className="koi koi-2" />
            <Koi className="koi koi-3" />

            <div className="pf-hero-copy">
                <p className="pf-eyebrow">Portofolio</p>
                <h1>Naufal Ramdhan Rizqika</h1>
                <p className="text-foam text-[0.82rem] mt-1 tracking-wide opacity-85">
                    Informatics Graduate
                </p>
                <p className="text-koi text-[0.72rem] tracking-wider font-display mt-0.5">
                    Web Developer · IoT · 3D/AR
                </p>
                <p className="pf-lede">
                    I build digital experiences and technology-driven solutions.
                </p>
                <div className="pf-hero-cta">
                    <a className="pf-btn" href="#projects">Lihat karya saya</a>
                    <a className="pf-btn pf-btn-ghost" href="#/cv">Unduh CV (PDF)</a>
                    <a className="pf-btn pf-btn-ghost" href="#contact">Hubungi saya</a>
                </div>
            </div>

            <div className="pf-scroll-cue">
                <span>menyelam lebih dalam</span>
                <div className="pf-scroll-line" />
            </div>
        </section>
    );
}