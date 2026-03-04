import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { LayoutDashboard, StarsIcon, ChevronDown, FileText, PenBox, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { checkUser } from '@/lib/inngest/checkUser';

async function Header() {
    await checkUser();
    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center p-4 border-b">
            <nav>
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="PrepWise Logo"
                        width={100}
                        height={20}
                        className="object-contain"
                        priority />
                </Link>
            </nav>

            <div className="flex items-center space-x-2 md:space-x-4">
                <SignedIn>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            <span className="hidden md:block">
                                Dashboard
                            </span>
                        </Link>
                    </Button>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <StarsIcon className="h-4 w-4" />
                                <span className="hidden md:block">Growth tools</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={"/resume"} className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 mr-2" />
                                    <span className="hidden md:block">Build Resume</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={"/ai-cover-letter"} className="flex items-center gap-2">
                                    <PenBox className="w-4 h-4 mr-2" />
                                    Cover Letter
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={"/interview"} className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    Interview Prep
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
                <SignedOut>
                    <SignInButton fallbackRedirectUrl="/dashboard" mode="modal" asChild>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "h-10 w-10",
                                userButtonPopoverCard: "shadow-xl",
                                userPreviewMainIdentifier: "font-semibold",
                            }
                        }}
                    />
                </SignedIn>
            </div>
        </header>
    );
}

export default Header;
