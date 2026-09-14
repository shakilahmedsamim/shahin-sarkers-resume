export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 text-base sm:text-lg">
          <a href="#" className="transition-colors hover:text-white">
            গোপনীয়তা নীতি
          </a>
          <a href="#" className="transition-colors hover:text-white">
            শর্তাবলী
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            যোগাযোগ
          </a>
        </div>
        <p className="text-sm text-brand-100/70">
          © {new Date().getFullYear()} শাহিন সরকার। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
