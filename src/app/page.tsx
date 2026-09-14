import ProfileCard from "@/components/ProfileCard";
import InfoSection from "@/components/InfoSection";
import { sections } from "@/data/resume";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8 lg:px-12 print:max-w-none print:p-0">
      <div className="flex flex-col gap-8 md:flex-row print:flex-col">
        <ProfileCard />
        <div className="flex flex-1 flex-col gap-6">
          {sections.map((section) => (
            <InfoSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
