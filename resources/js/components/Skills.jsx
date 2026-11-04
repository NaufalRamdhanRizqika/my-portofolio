import { skillGroups } from '../data/skills';
import Reveal from './ui/Reveal';

export default function Skills() {
    return (
        <Reveal as="section" id="skills" className="pf-section">
            <h2 className="pf-h-ripple font-display">
                Skills
                <span className="pf-ripple" aria-hidden="true" />
            </h2>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {skillGroups.map((group) => (
                    <div key={group.title} className="pf-card">
                        <h3 className="font-display">{group.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {group.skills.map((s) => (
                                <span key={s} className="pf-chip">{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Reveal>
    );
}