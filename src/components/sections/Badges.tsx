import bbb from "@/assets/badge-bbb.svg";
import angi from "@/assets/badge-angi.svg";
import phcc from "@/assets/badge-phcc.svg";

export function Badges() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2
          className="text-center text-4xl font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Badges
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-[94px] max-w-5xl mx-auto">
          <img src={bbb} alt="BBB Accredited Business" className="h-24 w-auto object-contain" />
          <img src={angi} alt="Angi Super Service Award" className="h-[154px] w-auto object-contain" />
          <img src={phcc} alt="PHCC Member" className="h-[121px] w-auto object-contain" />
        </div>
      </div>
    </section>
  );
}
