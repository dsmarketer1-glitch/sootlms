import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { fullName, email, password, phone } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    let clerkId = "";
    
    // Check if Clerk backend credentials exist
    const hasClerkSecret = !!process.env.CLERK_SECRET_KEY;

    if (hasClerkSecret) {
      try {
        const client = await clerkClient();
        
        // Split full name into first and last
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        // Build create params
        const createParams: any = {
          emailAddress: [email],
          password: password,
          firstName: firstName,
          lastName: lastName,
          skipPasswordChecks: true,
          publicMetadata: {
            role: "trainer"
          }
        };

        // Add phone number if provided (required by some Clerk instances)
        if (phone) {
          createParams.phoneNumber = [phone];
        }

        // Create Clerk user
        const clerkUser = await client.users.createUser(createParams);
        clerkId = clerkUser.id;
      } catch (clerkErr: any) {
        console.error("Clerk user creation error:", clerkErr);
        // Extract a user-friendly error message from Clerk's error response
        let errorMessage = "Failed to create user in Clerk.";
        if (clerkErr?.errors && Array.isArray(clerkErr.errors)) {
          errorMessage = clerkErr.errors.map((e: any) => e.longMessage || e.message).join("; ");
        } else if (clerkErr?.message) {
          errorMessage = clerkErr.message;
        }
        return NextResponse.json(
          { error: errorMessage },
          { status: 422 }
        );
      }
    } else {
      // In local dev without keys, generate a dummy Clerk ID
      console.warn("Clerk keys are missing. Creating teacher locally in Supabase database only.");
      clerkId = `mock_clerk_${Date.now()}`;
    }

    // Insert user profile into Supabase user_profiles table
    const newProfile = {
      clerk_id: clerkId,
      email: email,
      phone: phone || null,
      full_name: fullName,
      role: "trainer",
      is_active: true
    };

    const { data: profile, error: dbError } = await supabaseAdmin
      .from("user_profiles")
      .insert(newProfile)
      .select()
      .single();

    if (dbError) {
      console.error("Supabase user profile insertion error:", dbError);
      // Still return success since Clerk user was created — DB sync will happen on login
      return NextResponse.json({
        success: true,
        message: "Teacher account created in Clerk. Database sync will complete on first login.",
        teacher: { clerk_id: clerkId, email, full_name: fullName, role: "trainer" }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Teacher account created successfully!",
      teacher: profile
    });

  } catch (err: any) {
    console.error("Create teacher API unexpected error:", err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
