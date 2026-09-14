import type { Row, Section } from "@/data/resume";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const linkIcons = { facebook: FacebookIcon, email: EmailIcon };

function RowValue({ row }: { row: Row }) {
  if (row.href) {
    const Icon = row.icon && row.icon in linkIcons ? linkIcons[row.icon as keyof typeof linkIcons] : null;
    return (
      <a
        href={row.href}
        target={row.icon === "facebook" ? "_blank" : undefined}
        rel={row.icon === "facebook" ? "noopener noreferrer" : undefined}
        className="inline-flex items-start gap-2 break-all text-brand-700 underline decoration-brand-100 underline-offset-2 hover:text-brand-800"
      >
        {Icon && <Icon />}
        {row.value}
      </a>
    );
  }

  return <span className="whitespace-pre-line font-normal">{row.value}</span>;
}

export default function InfoSection({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-20 overflow-hidden rounded-2xl border-2 border-brand-700 bg-white print:rounded-none print:border print:shadow-none"
    >
      <h2 className="border-b border-brand-100 py-3 text-center text-base font-semibold text-brand-700 sm:py-4 sm:text-lg md:text-xl">
        {section.title}
      </h2>
      <div>
        {section.rows.map((row, index) => {
          const zebra = index % 2 === 0 ? "bg-white" : "bg-brand-50";
          return (
            <div
              key={row.label}
              className={`grid grid-cols-2 divide-x divide-brand-100 border-t border-brand-100 text-xs sm:text-base md:text-lg ${zebra}`}
            >
              <div className="px-2 py-2.5 font-medium text-brand-800 sm:px-5 sm:py-4">{row.label}</div>
              <div className="px-2 py-2.5 font-normal text-ink sm:px-5 sm:py-4">
                <RowValue row={row} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
