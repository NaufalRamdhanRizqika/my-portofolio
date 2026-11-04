export default function SectionHeading({ children, className = '' }) {
    return (
        <h2 className={`pf-h-ripple ${className}`}>
            {children}
            <span className="pf-ripple" aria-hidden="true" />
        </h2>
    );
}