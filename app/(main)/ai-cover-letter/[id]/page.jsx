import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../components/cover-letter-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CoverLetterPage = async ({ params }) => {
    const id = await params.id;
    const coverLetter = await getCoverLetter(id);

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex items-center gap-2">
                <Link href="/ai-cover-letter">
                    <Button variant="link" className="pl-0">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cover Letters
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold gradient-title">
                    {coverLetter?.jobTitle} at {coverLetter?.companyName}
                </h1>
                <p className="text-muted-foreground">
                    Generated on {new Date(coverLetter?.createdAt).toLocaleDateString()}
                </p>
            </div>

            <CoverLetterPreview content={coverLetter?.content} />
        </div>
    )
}

export default CoverLetterPage