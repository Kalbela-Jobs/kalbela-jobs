import { Button } from "@/components/ui/button";
import { Code, FileKey, Monitor, Trophy } from "lucide-react";
import { useState } from "react";
import { AccomplishmentDialog } from "./small_components/accomplishment-dialog";

interface AccomplishmentData {
    title: string;
    issuedOn: string;
    url: string;
    description: string;
    type: "portfolio" | "publication" | "award" | "project" | "other";
}

const UserAssets = () => {
    const [activeDialog, setActiveDialog] = useState<"portfolio" | "publication" | "award" | "project" | "other" | null>(null)
    const [accomplishmentData, setAccomplishmentData] = useState<AccomplishmentData[]>([]);

    const handleSaveAccomplishment = (data: AccomplishmentData) => {
        console.log("Saving accomplishment:", data);
        // @ts-ignore
        setAccomplishmentData([...accomplishmentData, { ...data, type: activeDialog }]);
    }

    const portfolio = accomplishmentData.filter((item) => item.type === "portfolio");
    const publications = accomplishmentData.filter((item) => item.type === "publication");
    const awards = accomplishmentData.filter((item) => item.type === "award");
    const projects = accomplishmentData.filter((item) => item.type === "project");
    const others = accomplishmentData.filter((item) => item.type === "other");

    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 bg-[#001968]/10 rounded-full flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-[#001968]" />
                </div>
                <p className="text-gray-600 max-w-lg">
                    Currently no data exists! Select & add your portfolio url, Papers/Journal, Publications, etc to enhance your profile
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                        variant="outline"
                        className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                        onClick={() => setActiveDialog("portfolio")}
                    >
                        Portfolio
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                        onClick={() => setActiveDialog("publication")}
                    >
                        Publications
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                        onClick={() => setActiveDialog("award")}
                    >
                        Awards/Honors
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                        onClick={() => setActiveDialog("project")}
                    >
                        Projects
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[#001968] text-[#001968] hover:bg-[#001968]/10"
                        onClick={() => setActiveDialog("other")}
                    >
                        Others
                    </Button>
                </div>
            </div>
            <AccomplishmentDialog
                type={activeDialog || "portfolio"}
                open={!!activeDialog}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                /* @ts-ignore */
                onSave={handleSaveAccomplishment}
            />

            {portfolio.length > 0 && <div className="mt-6">
                <h1 className="text-md font-semibold pb-2 border-b">Portfolio ({portfolio.length})</h1>
                <ul className="mt-3 space-y-3">
                    {
                        portfolio?.map((data, index) => (
                            <li key={index} className="md:grid grid-cols-6 gap-2 p-4 border hover:shadow-md duration-300 rounded">
                                <div className="bg-[#001968] rounded !w-[100px] !h-[100px] flex items-center justify-center text-white">
                                    <Code size={50} />
                                </div>
                                <div className="col-span-5">
                                    <div className="flex justify-between">
                                        <h3 className="text-md font-semibold capitalize">{data?.title}</h3>

                                        <p className="text-sm duration-300  text-gray-500 ">
                                            {data?.issuedOn}
                                        </p>
                                    </div>

                                    <a target={'_blank'} href={data?.url} className="text-sm duration-300 hover:text-blue-500 text-primary ">{data?.url.slice(0, 50)} {data?.url.length > 50 && "..."}</a>

                                    <p className="text-sm text-gray-500">{data?.description.slice(0, 200)} {data?.description.length > 100 && "..."}</p>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>}

            {publications.length > 0 && <div className="mt-6">
                <h1 className="text-md font-semibold pb-2 border-b">Publications ({publications.length})</h1>
                <ul className="mt-3 space-y-3">
                    {
                        publications?.map((data, index) => (
                            <li key={index} className="md:grid grid-cols-6 gap-2 p-4 border hover:shadow-md duration-300 rounded">
                                <div className="bg-[#001968] rounded !w-[100px] !h-[100px] flex items-center justify-center text-white">
                                    <Code size={50} />
                                </div>
                                <div className="col-span-5">
                                    <div className="flex justify-between">
                                        <h3 className="text-md font-semibold capitalize">{data?.title}</h3>

                                        <p className="text-sm duration-300  text-gray-500 ">
                                            {data?.issuedOn}
                                        </p>
                                    </div>

                                    <a target={'_blank'} href={data?.url} className="text-sm duration-300 hover:text-blue-500 text-primary ">{data?.url.slice(0, 50)} {data?.url.length > 50 && "..."}</a>

                                    <p className="text-sm text-gray-500">{data?.description.slice(0, 200)} {data?.description.length > 100 && "..."}</p>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>}

            {awards.length > 0 && <div className="mt-6">
                <h1 className="text-md font-semibold pb-2 border-b">Awards/Honors ({awards.length})</h1>
                <ul className="mt-3 space-y-3">
                    {
                        awards?.map((data, index) => (
                            <li key={index} className="md:grid grid-cols-6 gap-2 p-4 border hover:shadow-md duration-300 rounded">
                                <div className="bg-[#00682b] rounded !w-[100px] !h-[100px] flex items-center justify-center text-white">
                                    <Trophy strokeWidth={1.25} size={50} />
                                </div>
                                <div className="col-span-5">
                                    <div className="flex justify-between">
                                        <h3 className="text-md font-semibold capitalize">{data?.title}</h3>

                                        <p className="text-sm duration-300  text-gray-500 ">
                                            {data?.issuedOn}
                                        </p>
                                    </div>

                                    <a target={'_blank'} href={data?.url} className="text-sm duration-300 hover:text-blue-500 text-primary ">{data?.url.slice(0, 50)} {data?.url.length > 50 && "..."}</a>

                                    <p className="text-sm text-gray-500">{data?.description.slice(0, 200)} {data?.description.length > 100 && "..."}</p>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>}


            {projects.length > 0 && <div className="mt-6">
                <h1 className="text-md font-semibold pb-2 border-b">Projects ({projects.length})</h1>
                <ul className="mt-3 space-y-3">
                    {
                        projects?.map((data, index) => (
                            <li key={index} className="md:grid grid-cols-6 gap-2 p-4 border hover:shadow-md duration-300 rounded">
                                <div className="bg-[#005068] rounded !w-[100px] !h-[100px] flex items-center justify-center text-white">
                                    <Monitor strokeWidth={1.25} size={50} />
                                </div>
                                <div className="col-span-5">
                                    <div className="flex justify-between">
                                        <h3 className="text-md font-semibold capitalize">{data?.title}</h3>

                                        <p className="text-sm duration-300  text-gray-500 ">
                                            {data?.issuedOn}
                                        </p>
                                    </div>

                                    <a target={'_blank'} href={data?.url} className="text-sm duration-300 hover:text-blue-500 text-primary ">{data?.url.slice(0, 50)} {data?.url.length > 50 && "..."}</a>

                                    <p className="text-sm text-gray-500">{data?.description.slice(0, 200)} {data?.description.length > 100 && "..."}</p>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>}

            {others.length > 0 && <div className="mt-6">
                <h1 className="text-md font-semibold pb-2 border-b">Others ({others.length})</h1>
                <ul className="mt-3 space-y-3">
                    {
                        others?.map((data, index) => (
                            <li key={index} className="md:grid grid-cols-6 gap-2 p-4 border hover:shadow-md duration-300 rounded">
                                <div className="bg-[#ad196ff3] rounded !w-[100px] !h-[100px] flex items-center justify-center text-white">
                                    <FileKey size={50} strokeWidth={1.25} />
                                </div>
                                <div className="col-span-5">
                                    <div className="flex justify-between">
                                        <h3 className="text-md font-semibold capitalize">{data?.title}</h3>

                                        <p className="text-sm duration-300  text-gray-500 ">
                                            {data?.issuedOn}
                                        </p>
                                    </div>

                                    <a target={'_blank'} href={data?.url} className="text-sm duration-300 hover:text-blue-500 text-primary ">{data?.url.slice(0, 50)} {data?.url.length > 50 && "..."}</a>

                                    <p className="text-sm text-gray-500">{data?.description.slice(0, 200)} {data?.description.length > 100 && "..."}</p>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>}
        </div>
    );
};

export default UserAssets;