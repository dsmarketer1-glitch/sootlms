import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

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

        // Create Clerk user
        const clerkUser = await client.users.createUser({
          emailAddress: [email],
          password: password,
          firstName: firstName,
          lastName: lastName,
          publicMetadata: {
            role: "trainer"
          }
        });

        clerkId = clerkUser.id;
      } catch (clerkErr: any) {
        console.error("Clerk user creation error:", clerkErr);
        return NextResponse.json(
          { error: clerkErr?.message || "Failed to create user in Clerk." },
          { status: 500 }
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
      full_name: fullName,
      role: "trainer",
      is_active: true
    };

    const { data: profile, error: dbError } = await supabase
      .from("user_profiles")
      .insert(newProfile)
      .select()
      .single();

    if (dbError) {
      console.error("Supabase user profile insertion error:", dbError);
      return NextResponse.json(
        { error: `Teacher created in Clerk, but failed to insert in Supabase: ${dbError.message}` },
        { status: 500 }
      );
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
