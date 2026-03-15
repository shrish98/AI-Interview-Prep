import { getCoverLetters } from "@/actions/cover-letter";
import CoverLetterList from "./components/cover-letter-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CoverLetterGenerator from "./components/cover-letter-generation";

export default async function CoverLetterPage() {
    const coverLetters = await getCoverLetters();

    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bold gradient-title">
                        AI Cover Letter
                    </h1>
                    <p className="text-muted-foreground">
                        Create and manage professional cover letters for your job applications
                    </p>
                </div>
                <Link href="/ai-cover-letter/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                    </Button>
                </Link>
            </div>

            <CoverLetterGenerator />

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">My Cover Letters</h2>
                <CoverLetterList coverLetters={coverLetters} />
            </div>
        </div>
    );
}
