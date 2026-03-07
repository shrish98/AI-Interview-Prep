"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/app/data/faqs";

export function FaqSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => {
                return (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
