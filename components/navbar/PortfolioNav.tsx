'use client';
import { useUserData } from '@/utils/encript_decript';
import React, { useEffect, useState } from 'react';
import UserNav from './UserNav';
import PrimaryBtn from '../PrimaryBtn';
import SecondaryBtn from '../SecondaryBtn';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Cookies from 'js-cookie';

const PortfolioNav: React.FC = () => {
    const [user] = useUserData();
    console.log("loremmmmm..............", user);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { theme } = useTheme()
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                setIsAuthenticated(!!user)
            } catch (error) {
                console.error("Error fetching user data:", error)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        })()

        const get_user = Cookies.get("kalbelajobs_user");
        if (!get_user) {
            router.push('/login');
        }
    }, [])

    return (
        <div>
            <div className="items-center lg:hidden block border-b border-gray-500">
                {loading ? <Skeleton className="h-8 w-8 rounded-full" /> : <UserNav loading={loading} user={user} />}
            </div>
            <div className="border-b">
                <MaxWidthWrapper className="flex h-[64px] items-center justify-between">
                    <div>
                        <Link href="/">
                            <img
                                className="mx-auto h-auto w-36 md:w-48"
                                src={theme === "dark" ? "/logo_dark.png" : "/logo.png"}
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <div className="flex gap-2 items-center justify-end">
                        <div className="items-center lg:block hidden ">
                            <UserNav loading={loading} user={user} />
                        </div>

                        {!user && !loading && (
                            <div className="hidden items-center justify-between space-x-4 md:me-0 lg:flex">
                                <PrimaryBtn
                                    className="px-4 py-2"
                                    onClick={() => router.push("/login")}
                                >
                                    Login
                                </PrimaryBtn>
                                <SecondaryBtn
                                    className="px-4 py-2"
                                    onClick={() => router.push("/registration")}
                                >
                                    Registration
                                </SecondaryBtn>
                                <Button
                                    className="whitespace-nowrap bg-[#001968] w-[120px] px-4 py-2 size-10"
                                    onClick={() =>
                                        window.open("https://app.kalbelajobs.com/admin", "_blank")
                                    }
                                >
                                    For Employers
                                </Button>
                            </div>
                        )}



                        <div className="ml-2">
                            <ThemeToggle />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default PortfolioNav;