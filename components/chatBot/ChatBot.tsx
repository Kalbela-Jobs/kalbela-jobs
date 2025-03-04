'use client';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ChatBotContainer from './ChatBotContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const queryClient = new QueryClient();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // Ensure scroll is re-enabled on cleanup
        };
    }, [isOpen]);

    return (
        <QueryClientProvider client={queryClient}>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed md:bottom-10 bottom-[100px] right-10 text-white z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#1c2426] shadow-xl"
            >
                <MessageSquare size={32} strokeWidth={0.7} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="md:mx-0 mx-2 relative bg-white w-full max-w-6xl overflow-hidden rounded-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <ChatBotContainer isOpen={isOpen} setIsOpen={setIsOpen} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </QueryClientProvider>
    );
};

export default ChatBot;
