import { profile, quickFacts } from "@/data/resume";
import Avatar from "@/components/Avatar";

export default function ProfileCard() {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 md:w-80 lg:w-96 print:w-full">
      <aside className="overflow-hidden rounded-2xl bg-brand-700 text-white print:rounded-none">
        <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-8 text-center">
          <Avatar src={profile.photo} alt={profile.name} />
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">{profile.name}</h1>
        </div>

        <dl className="text-xs sm:text-base md:text-lg">
          {quickFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={`grid grid-cols-2 divide-x divide-white/20 border-t border-white/20 text-center ${
                index % 2 === 0 ? "bg-white/0" : "bg-black/10"
              }`}
            >
              <dt className="px-2 py-2.5 font-medium sm:px-3 sm:py-3.5">{fact.label}</dt>
              <dd className="px-2 py-2.5 font-normal sm:px-3 sm:py-3.5">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className="flex gap-3 print:hidden">
        <a
          href={profile.resumeUrl}
          download
          className="flex-1 rounded-full border border-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 sm:text-lg"
        >
          PDF ডাউনলোড
        </a>
        <a
          href="#contact"
          className="flex-1 rounded-full bg-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-800 sm:text-lg"
        >
          যোগাযোগ করুন
        </a>
      </div>
    </div>
  );
}
