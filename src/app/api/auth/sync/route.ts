import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { clerkId, email, fullName, imageUrl, dbRole } = await request.json();

    if (!clerkId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Check if user profile already exists
    const { data: existingProfile, error: fetchError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('clerk_id', clerkId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Error fetching user profile during sync:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 2. If it doesn't exist, create it using the Admin Client (bypassing RLS)
    if (!existingProfile) {
      const newProfile = {
        clerk_id: clerkId,
        email: email,
        full_name: fullName || "Anonymous Learner",
        role: dbRole || 'student',
        avatar_url: imageUrl || null,
        is_active: true,
      };

      const { data: insertedProfile, error: insertError } = await supabaseAdmin
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting new profile during sync:", insertError);
        return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
      }
      
      return NextResponse.json({ success: true, profile: insertedProfile });
    }

    // 3. If it exists, update it if the role needs to be forced to admin based on email
    if (email.toLowerCase() === 'ds.marketer1@gmail.com' && existingProfile.role !== 'admin') {
      const { data: updatedProfile, error: updateError } = await supabaseAdmin
        .from('user_profiles')
        .update({ role: 'admin' })
        .eq('clerk_id', clerkId)
        .select()
        .single();
        
      if (updateError) {
         console.error("Error updating admin profile during sync:", updateError);
         return NextResponse.json({ success: true, profile: existingProfile, message: "Failed to enforce admin role" });
      }
      return NextResponse.json({ success: true, profile: updatedProfile });
    }

    return NextResponse.json({ success: true, profile: existingProfile });

  } catch (error: any) {
    console.error("Auth sync route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
