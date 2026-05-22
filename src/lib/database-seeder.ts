import { supabase } from './supabase';

const SEED_COURSES = [
  {
    title: "Mastering Performance Marketing",
    slug: "performance-marketing",
    short_description: "Scale your business with Google Ads, Meta Ads, and advanced funnel strategies.",
    description: "This comprehensive course takes you deep into the world of performance marketing. You will learn how to build, optimize, and scale high-converting campaigns across all major platforms.",
    thumbnail_url: "/courses/performance.jpg",
    price: 10000, // Matching the total fees of 10000 mentioned in prompt
    discounted_price: 10000,
    duration_weeks: 8,
    difficulty_level: "intermediate" as const,
    category: "Marketing",
    tags: ["google ads", "meta ads", "funnel optimization"],
    is_published: true,
    is_featured: true,
    rating: 4.8,
    modules: [
      {
        title: "Introduction to Performance Marketing",
        description: "Understanding the foundation of performance marketing and setting up KPIs.",
        lessons: [
          { title: "What is Performance Marketing?", content: "Learn the core fundamentals of performance marketing.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: true },
          { title: "Setting Up Your KPIs", content: "How to define key performance indicators that drive real business growth.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false },
          { title: "Understanding Attribution Models", content: "Master first-click, last-click, linear, and data-driven attribution.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      },
      {
        title: "Google Ads Deep Dive",
        description: "Advanced optimization strategies for search, display, and shopping campaigns.",
        lessons: [
          { title: "Search Campaigns & Bidding Strategy", content: "Optimize for search keywords and high quality scores.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false },
          { title: "Display & Video Ads Mastery", content: "Build visually outstanding display campaigns and YouTube ad placements.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false },
          { title: "Advanced Remarketing Setup", content: "Target past buyers and warm audiences with custom retargeting tags.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      },
      {
        title: "Meta Ads Mastery",
        description: "Scale high-converting Facebook and Instagram ad campaigns.",
        lessons: [
          { title: "The Facebook Pixel & Conversions API", content: "Setup clean event tracking with first-party CAPI connections.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false },
          { title: "Audience Targeting & Core Personas", content: "Navigate broad targeting, lookalikes, and interest grouping.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false },
          { title: "Creative Optimization Secrets", content: "Design hook-driven creatives that achieve low Cost Per Acquisition.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      },
      {
        title: "Funnel Strategy & Scaling",
        description: "Combine channels into an omnichannel machine.",
        lessons: [
          { title: "Creating High-Converting Landers", content: "Optimize landing pages using proven psychological friction points.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      }
    ]
  },
  {
    title: "AI-Powered SEO Masterclass",
    slug: "ai-seo",
    short_description: "Learn how to use ChatGPT and Jasper to dominate search rankings in 2026.",
    description: "SEO has changed. In this course, you'll learn how to leverage artificial intelligence to automate keyword research, content generation, and technical SEO audits.",
    thumbnail_url: "/courses/ai-seo.jpg",
    price: 10000,
    discounted_price: 7999,
    duration_weeks: 6,
    difficulty_level: "advanced" as const,
    category: "SEO",
    tags: ["seo", "ai", "content generation"],
    is_published: true,
    is_featured: false,
    rating: 4.9,
    modules: [
      {
        title: "The AI Revolution in SEO",
        description: "How search layout is changing and how to adapt with AI.",
        lessons: [
          { title: "Future of Search & LLMs", content: "Understand search generative experiences.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: true },
          { title: "AI Content Automation Tools", content: "Deploy high-quality automated pipelines.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      },
      {
        title: "Keyword Research & Clustering",
        description: "Group search query intent using semantic AI tools.",
        lessons: [
          { title: "Semantic Keyword Clustering with LLMs", content: "Automate clustering maps using prompt patterns.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      }
    ]
  },
  {
    title: "Digital Branding & Storytelling",
    slug: "branding-storytelling",
    short_description: "Build a brand that people love and remember through creative thinking.",
    description: "Go beyond logos and colors. Learn the psychological art of storytelling and how to build a brand that resonates with the human experience.",
    thumbnail_url: "/courses/branding.jpg",
    price: 10000,
    discounted_price: 8999,
    duration_weeks: 10,
    difficulty_level: "beginner" as const,
    category: "Branding",
    tags: ["branding", "storytelling", "creative writing"],
    is_published: true,
    is_featured: false,
    rating: 4.7,
    modules: [
      {
        title: "Fundamentals of Branding",
        description: "Core assets and guidelines of premium brand building.",
        lessons: [
          { title: "Brand Identity Frameworks", content: "Set your core pillars and brand voice rules.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: true }
        ]
      },
      {
        title: "The Art of Storytelling",
        description: "Engage customers using high-resonance narratives.",
        lessons: [
          { title: "Narrative Archetypes", content: "Leverage standard storytelling formulas for advertising.", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", video_platform: "youtube" as const, is_free_preview: false }
        ]
      }
    ]
  }
];

export async function seedDatabaseIfEmpty() {
  try {
    // Check if courses are already present
    const { count, error: countError } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error checking courses count:', countError);
      return;
    }

    if (count && count > 0) {
      // Database already has courses, skip seeding
      return;
    }

    console.log('Database empty. Seeding mock courses, modules, and lessons...');

    for (const cData of SEED_COURSES) {
      const { modules, ...coursePayload } = cData;

      // 1. Insert course
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert(coursePayload as any)
        .select()
        .single();

      if (courseError || !course) {
        console.error(`Error seeding course "${coursePayload.title}":`, courseError);
        continue;
      }

      // 2. Insert modules and lessons
      for (let mIdx = 0; mIdx < modules.length; mIdx++) {
        const m = modules[mIdx];
        const { lessons, ...modulePayload } = m;

        const { data: moduleRecord, error: moduleError } = await supabase
          .from('modules')
          .insert({
            course_id: course.id,
            title: modulePayload.title,
            description: modulePayload.description,
            order_index: mIdx + 1,
            is_published: true
          })
          .select()
          .single();

        if (moduleError || !moduleRecord) {
          console.error(`Error seeding module "${modulePayload.title}":`, moduleError);
          continue;
        }

        // 3. Insert lessons
        for (let lIdx = 0; lIdx < lessons.length; lIdx++) {
          const l = lessons[lIdx];
          const { error: lessonError } = await supabase
            .from('lessons')
            .insert({
              module_id: moduleRecord.id,
              title: l.title,
              content: l.content,
              video_url: l.video_url,
              video_platform: l.video_platform,
              order_index: lIdx + 1,
              is_free_preview: l.is_free_preview,
              is_published: true
            });

          if (lessonError) {
            console.error(`Error seeding lesson "${l.title}":`, lessonError);
          }
        }
      }
    }
    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Unexpected error during seeding:', err);
  }
}
