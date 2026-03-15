"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from 'react';

const HeroSection = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (imageElement) {
                if (scrollPosition > scrollThreshold) {
                    imageElement.classList.add("scrolled");
                } else {
                    imageElement.classList.remove("scrolled");
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <section className="w-full pt-20 md:pt-48 pb-0">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="gradient-title" >
                        Your AI Career Coach for
                        <br />
                        Professional Success
                    </h1>
                    <p>
                        Advance your career with AI-powered resume building and interview prep
                    </p>
                </div>
                <div>
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                    </Link>

                </div>
                <div className="hero-image-wrapper mt-5 md:mt-0"> {/* for tilting the image */}
                    <div ref={imageRef} className="hero-image px-4 md:px-24 relative w-full max-w-7xl mx-auto">
                        <Image src="/banner-trimmed.png" alt="banner preview" width={1280} height={720} className="rounded-lg shadow-2xl border mx-auto w-full h-auto" priority />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection