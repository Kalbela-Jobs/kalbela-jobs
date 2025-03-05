'use client';
import { decryptId } from '@/utils/encriptDecriptGenarator';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Facebook, Github, Home, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface ShareProfilePageProps {
    params: {
        id: string
    }
}

const ShareProfilePage: React.FC<ShareProfilePageProps> = ({ params: { id } }) => {
    const decryptedId = decryptId(decodeURIComponent(id));
    const [userData, setUserData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/v1/user/user-profile?user_id=${decryptedId}`);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [decryptedId]);

    const user = userData?.data;

    console.log(user, 'userData');

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}
            {!loading && !error && (
                <main className='w-full border p-8 relative'>
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <header className='flex gap-4'>
                                <div className="border border-gray-200 rounded-full object-scale-down w-[120px] h-[120px] overflow-hidden">
                                    {/* <Image
                                        src={user?.profile_picture ?? "/icons/icon-192x192.png"}
                                        alt="Profile Picture"
                                        width={500}
                                        height={500}
                                        className="w-full h-full rounded-full"
                                    /> */}
                                </div>
                                {/* <div className="mt-2">
                                    <h2 className="text-2xl capitalize font-semibold">
                                        {user?.fullName}
                                    </h2>
                                    <div className="mt-2 flex text-gray-500 text-sm flex-wrap gap-2">
                                        {user?.address && <div className="flex items-center gap-1">
                                            <Home size={20} strokeWidth={1.2} /> <p>{user?.address ?? ''}</p>
                                        </div>}

                                        <a href='#' className="flex  duration-200 hover:text-blue-800 items-center gap-1">
                                            <Phone size={20} strokeWidth={1.2} /> <p>+880172625242</p>
                                        </a>

                                        {user?.email && <a href={`${user?.email}`} className="flex duration-200 hover:text-blue-800  items-center gap-1">
                                            <Mail size={20} strokeWidth={1.2} /> <p>nahid@gmail.com</p>
                                        </a>}
                                    </div>
                                </div> */}
                            </header>

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae fuga enim voluptate provident distinctio ab reiciendis porro nisi cupiditate temporibus non libero, quaerat magni mollitia amet cum consequuntur, molestias rerum odio accusamus debitis inventore facere fugit suscipit. Accusamus tempora repudiandae facilis veniam totam architecto. Ex, non quos. Suscipit magnam, delectus rem, earum ducimus corrupti excepturi cumque autem veritatis alias sunt facere cum atque amet debitis sapiente numquam laborum doloribus doloremque, dolore iure quae? Hic, repellat fuga harum incidunt nisi tempora voluptas, recusandae voluptatum aut voluptates soluta laboriosam. Illo quia voluptas quos architecto assumenda eum non autem alias totam, labore quam! Eos doloribus eligendi neque! Velit optio porro eaque consectetur enim fuga culpa reiciendis dolores ipsum deserunt a commodi et corrupti blanditiis minus cumque, possimus odit doloremque tempora. Necessitatibus facere numquam aperiam quisquam et perspiciatis excepturi error ad aut commodi molestias voluptas molestiae, suscipit nesciunt asperiores iste culpa ab. Ex quaerat modi dolor eius deserunt sit ducimus voluptate blanditiis itaque molestiae. Optio illum corporis assumenda excepturi qui quod ipsa, esse quisquam dignissimos! Illo corrupti iusto molestiae assumenda quisquam quod fugiat eaque consequuntur eius veritatis totam error quam aut modi magnam, illum vel soluta consectetur hic asperiores et! Voluptatem natus, ad consectetur unde laboriosam cupiditate repellat Quisquam at dolorum explicabo tenetur placeat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus a dolorem quo excepturi nulla minima voluptatem illo laborum cumque, ducimus voluptas rerum porro libero itaque corporis voluptates fugiat explicabo sed incidunt reprehenderit veniam nihil optio numquam neque! Incidunt, nulla a quod totam excepturi cumque at ad? Libero corrupti laborum laudantium, accusantium quo similique, officiis vero voluptates eaque perspiciatis tenetur? Vero tempore excepturi inventore tempora, suscipit totam perferendis odio sapiente deleniti atque id qui doloribus molestiae sed, cupiditate dolor quae velit nam quasi. Praesentium nemo officia assumenda est enim reiciendis nisi omnis, non ea sit error, impedit quidem doloribus explicabo expedita quae eius itaque commodi atque dolorem tempora vero, ab voluptates! Sapiente aliquid minima eum expedita possimus impedit ut alias voluptates, labore, tempore cum laboriosam, adipisci ullam incidunt quas corporis temporibus odit recusandae totam quod fugit molestiae cumque qui? Amet, nam! Excepturi accusantium quam deleniti hic, quasi, cum ipsam ipsum vitae ipsa nisi magni laudantium, natus ducimus neque quod temporibus? Maxime distinctio incidunt laudantium molestias nulla, autem, temporibus suscipit perspiciatis quas aperiam, ullam ex? Eum, corrupti esse perferendis culpa sint magni ipsum autem explicabo similique pariatur fugit libero doloribus ut quas, laborum tenetur dolores veniam facere architecto doloremque delectus? Temporibus in facere exercitationem laborum minus officia labore reiciendis magnam voluptas facilis vitae perferendis excepturi beatae, a porro optio ullam rem? Error quod quasi officiis dicta deserunt quae, corrupti consequuntur molestiae tempore eum autem atque enim accusantium praesentium cupiditate aliquid facere cum nisi porro nesciunt magni et architecto eligendi! Enim provident fugit impedit reiciendis deserunt! Laudantium laboriosam iusto similique alias perspiciatis modi cum voluptatem id laborum ad architecto mollitia quis, maxime cumque repudiandae optio placeat rerum nulla sequi sed ab. Dolores distinctio facilis molestiae sapiente ducimus aliquid. Earum odit, eos sit doloremque quidem magnam recusandae maxime accusamus, minus labore itaque vero ducimus cupiditate rem aut neque excepturi. Assumenda quibusdam maiores illo distinctio amet sequi odit vitae est maxime laboriosam laudantium cupiditate numquam tenetur impedit repellat nisi culpa ipsa dignissimos, voluptatem molestiae minus rerum quidem repellendus! Consequuntur quod ad tempore atque? Esse accusantium numquam animi? Error nam quasi dolorem sint perferendis doloribus repudiandae nihil placeat, quibusdam animi possimus dolore voluptatibus architecto esse voluptas laudantium in, nulla veritatis doloremque! Dicta aspernatur sint, rerum nesciunt eveniet quia sapiente optio, mollitia perferendis ipsum animi doloribus facilis ipsam expedita quis veniam dolor in vel deleniti culpa aliquam quos unde dolore. Error cupiditate beatae dolorum dicta! Iusto eaque similique reprehenderit maxime recusandae repellendus ipsam autem quo neque voluptatem doloremque nemo sed ab aspernatur consectetur mollitia pariatur impedit placeat, accusamus numquam tenetur! Error, quidem. Libero provident natus, qui suscipit voluptatum non earum? Distinctio magni consequuntur magnam? Sequi recusandae asperiores ea aliquam sunt, explicabo cum corrupti consequatur, excepturi architecto beatae. Error expedita ipsa nisi explicabo neque delectus consectetur voluptate, earum at quo perferendis quas eum, ad corrupti asperiores itaque officia excepturi. Consectetur totam hic vero quos officia repellat nulla soluta veritatis iste quae nesciunt error ipsa corporis magnam, in non expedita corrupti nisi quasi, quam labore nobis quod ipsam? Magni!
                        </div>
                        <div>
                            <div className="border rounded-xl p-6">
                                <h3 className="text-lg font-semibold">
                                    Quick Links
                                </h3>
                                <ul className='text-gray-700 mt-3'>
                                    <li className='flex items-center  duration-300 hover:text-blue-800 gap-1 mb-2'>
                                        <Facebook strokeWidth={1.2} size={20} />
                                        <Link href={'#'}>nahid360s/43jhsd/sfasdoijf</Link>
                                    </li>
                                    <li className='flex items-center  duration-300 hover:text-blue-800 gap-1 mb-2'>
                                        <Linkedin strokeWidth={1.2} size={20} />
                                        <Link href={'#'}>nahid360s/43jhsd/sfasdoijf</Link>
                                    </li>
                                    <li className='flex items-center  duration-300 hover:text-blue-800 gap-1 mb-2'>
                                        <Github strokeWidth={1.2} size={20} />
                                        <Link href={'#'}>nahid360s/43jhsd/sfasdoijf</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default ShareProfilePage;