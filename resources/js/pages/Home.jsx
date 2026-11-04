import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Organization from '../components/Organization';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Bubbles from '../components/ui/Bubbles';

export default function Home() {
    return (
        <div className="pf-pond">
            <a className="pf-skip-link" href="#top">Langsung ke konten</a>
            <Bubbles />
            <Navbar />

            <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Organization />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}