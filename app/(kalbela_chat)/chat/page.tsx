// 'use client';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";  // Import motion from framer-motion
// import Message from "./message/Message";
// import ChatMainBox from "./components/ChatMainBox";
// import Image from "next/image";
// import './message/style/sidebar.css';

// const kalbela_chat_page = () => {
//     const queryClient = new QueryClient();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(false);
//         }, 3000);
//     }, []);

//     return (
//         <div className="relative">
//             <QueryClientProvider client={queryClient}>
//                 {loading ? (
//                     <div className="fixed inset-0 flex items-center justify-center bg-white">
//                         <div className="text-xl flex flex-col items-center justify-center">
//                             <motion.div
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Image
//                                     src="/logo.png"
//                                     alt="Loading"
//                                     width={100}
//                                     height={100}
//                                     className="mx-auto w-[300px]"
//                                 />
//                             </motion.div>
//                             <motion.h1
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ duration: 1 }}
//                                 className="text-xl mt-4 font-bold">Welcome to Kalbela Chat</motion.h1>
//                         </div>
//                     </div>
//                 ) : (
//                     <ChatMainBox />
//                 )}

//             </QueryClientProvider>
//         </div>
//     );
// };

// export default kalbela_chat_page;



'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";  // Import motion from framer-motion
import Message from "./message/Message";
import ChatMainBox from "./components/ChatMainBox";
import Image from "next/image";
import './message/style/sidebar.css';

const kalbela_chat_page = () => {
    const queryClient = new QueryClient();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="relative">
            <QueryClientProvider client={queryClient}>
                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-white">
                        <div className="text-xl flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <Image
                                    src="/logo.png"
                                    alt="Loading"
                                    width={100}
                                    height={100}
                                    className="mx-auto w-[300px]"
                                />
                            </motion.div>
                            <motion.h1
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1 }}
                                className="text-xl mt-4 font-bold">Welcome to Kalbela Chat</motion.h1>
                        </div>
                    </div>
                ) : (
                    <ChatMainBox />
                )}
            </QueryClientProvider>
        </div>
    );
};

export default kalbela_chat_page;