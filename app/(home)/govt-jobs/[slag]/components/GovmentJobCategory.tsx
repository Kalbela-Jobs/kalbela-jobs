import Link from "next/link";

const GovmentJobCategory = () => {
      const categories = [{
            name: "চাকরির বিজ্ঞপ্তি",
            href: "/govt-jobs"
      },
      {
            name: "চাকরি প্রস্তুতি",
            href: "/govt-jobs/chakir-prostot"
      },
      {
            name: "পরীক্ষার নোটিশ",
            href: "/govt-jobs/porkishar-nootish"
      },
      {
            name: "পরীক্ষার ফলাফল",
            href: "/govt-jobs/porkishar-falafol"
      },
      {
            name: "চাকরির বিধিবিধান",
            href: "/govt-jobs/chakir-bidhibidhan"
      },
      {
            name: "ট্রিপস এন্ড ট্রিকস",
            href: "/govt-jobs/trips-and-tricks"
      },
      {
            name: "নিয়োগ বিধি",
            href: "/govt-jobs/nishog-bidhi"
      },
      {
            name: "ভর্তি বিজ্ঞপ্তি",
            href: "/govt-jobs/bhorthi-bijanot"
      }
      ];

      return (
            <div className="mt-4">
                  <ul className="grid  p-0 lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-2">
                        {categories.map((category, index) => (
                              <li key={index} className="text-sm md:text-center border px-2 py-1 bg-[#bbc0d1] font-semibold hover:bg-[#001968] rounded flex items-center md:justify-center hover:!text-white !text-[#001968] duration-200">
                                    <Link href={category?.href || ""}>{category.name || ""}</Link>
                              </li>
                        ))}
                  </ul>
            </div>
      );
};

export default GovmentJobCategory;
