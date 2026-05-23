import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { title, description, course_id, scheduled_at, duration_minutes, trainer_id, meeting_platform, meeting_room_url } = await request.json();

    if (!title || !course_id || !scheduled_at || !trainer_id) {
      return NextResponse.json(
        { error: "Title, Course, Scheduled Date/Time, and Trainer are required." },
        { status: 400 }
      );
    }

    const newClass = {
      title,
      description,
      course_id,
      scheduled_at,
      duration_minutes: duration_minutes || 60,
      trainer_id,
      meeting_platform: meeting_platform || 'zoom',
      meeting_room_url,
      status: 'scheduled'
    };

    const { data: createdClass, error: dbError } = await supabaseAdmin
      .from("live_classes")
      .insert(newClass)
      .select()
      .single();

    if (dbError) {
      console.error("Error creating live class:", dbError);
      return NextResponse.json(
        { error: `Failed to create class in Supabase: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Live class scheduled successfully!",
      liveClass: createdClass
    });

  } catch (err: any) {
    console.error("Create class API unexpected error:", err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
