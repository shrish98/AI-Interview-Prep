"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard"; // ⚠️ double check this path is correct

export async function updateUser(data) {
    console.log("Received data in updateUser:", data);

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { ClerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        // First check if industry insight exists
        let industryInsight = await db.industryInsight.findUnique({
            where: {
                industry_subIndustry: {
                    industry: data.industry,
                    subIndustry: data.subIndustry,
                }
            },
        });

        // If it doesn't exist, generate and create it
        if (!industryInsight) {
            const insights = await generateAIInsights(`${data.industry} - ${data.subIndustry}`);

            industryInsight = await db.industryInsight.create({
                data: {
                    industry: data.industry,
                    subIndustry: data.subIndustry,
                    ...insights,
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
        }

        // Now update the user
        const updatedUser = await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                industry: data.industry,
                subIndustry: data.subIndustry,
                experience: data.experience,
                bio: data.bio,
                skills: data.skills,
            },
        });

        revalidatePath("/");
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: {
                ClerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}