import Link from "next/link";

const GovmentJobCategory = () => {
    const categories = [
        "চাকরির বিজ্ঞপ্তি", 
        "পরীক্ষার নোটিশ", 
        "ফলাফল", 
        "চাকরির প্রস্তুতি", 
        "চাকরির নিয়ম",
        "ভর্তি বিজ্ঞপ্তি",
        "নিয়োগ বিধি" ,
        "ভর্তি বিজ্ঞপ্তি",     
    ];

    return (
        <div className="mt-4">
            <ul className="grid  border-green-600 p-0 lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-2">
                {categories.map((category, index) => (
                    <li key={index} className="text-sm md:text-center px-2 py-1 hover:bg-green-600 rounded flex items-center md:justify-center hover:!text-white !text-green-700 dration-200">
                        <Link href={`/govt-jobs/${category}`}>{category}</Link>
                        </li>
                ))}
            </ul>
        </div>
    );
};

export default GovmentJobCategory;
