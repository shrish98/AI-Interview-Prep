"use client";

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, StarsIcon, ChevronDown, FileText, PenBox, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
    return (
        <React.Fragment>
            <SignedIn>
                <Button variant='outline' asChild>
                    <Link href='/dashboard'>
                        <LayoutDashboard className='w-4 h-4 mr-2' />
                        <span>Dashboard</span>
                    </Link>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="default" className="flex items-center gap-2 outline-none">
                            <StarsIcon className='h-4 w-4' />
                            <span>Growth tools</span>
                            <ChevronDown className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={'/resume'} className='flex items-center gap-2'>
                                <FileText className='w-4 h-4' />
                                <span>Build Resume</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/ai-cover-letter'} className='flex items-center gap-2'>
                                <PenBox className='w-4 h-4' />
                                <span>Cover Letter</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={'/interview'} className='flex items-center gap-2'>
                                <GraduationCap className='w-4 h-4' />
                                <span>Interview Prep</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SignedIn>

            <SignedOut>
                <SignInButton fallbackRedirectUrl='/dashboard'>
                    <Button variant='outline'>Sign In</Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: 'h-10 w-10',
                            userButtonPopoverCard: 'shadow-xl',
                            userPreviewMainIdentifier: 'font-semibold'
                        }
                    }}
                />
            </SignedIn>
        </React.Fragment>
    );
}
