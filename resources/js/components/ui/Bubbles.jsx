const BUBBLES = [
    { left: '6%',  size: 8,  dur: 14, delay: 0 },
    { left: '18%', size: 5,  dur: 11, delay: 2 },
    { left: '31%', size: 10, dur: 17, delay: 4 },
    { left: '47%', size: 6,  dur: 13, delay: 1 },
    { left: '58%', size: 9,  dur: 16, delay: 6 },
    { left: '69%', size: 5,  dur: 12, delay: 3 },
    { left: '81%', size: 7,  dur: 15, delay: 5 },
    { left: '92%', size: 6,  dur: 12, delay: 7 },
];

export default function Bubbles() {
    return (
        <div className="pf-bubbles" aria-hidden="true">
            {BUBBLES.map((b, i) => (
                <span
                    key={i}
                    className="pf-bubble"
                    style={{
                        left: b.left,
                        width: b.size,
                        height: b.size,
                        animationDuration: `${b.dur}s`,
                        animationDelay: `${b.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}