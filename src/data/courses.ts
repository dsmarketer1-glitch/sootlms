export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  price: number;
  discountedPrice?: number;
  durationWeeks: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  students: string;
  rating: number;
  modules: {
    title: string;
    lessons: string[];
  }[];
};

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Mastering Performance Marketing",
    slug: "performance-marketing",
    shortDescription: "Scale your business with Google Ads, Meta Ads, and advanced funnel strategies.",
    description: "This comprehensive course takes you deep into the world of performance marketing. You will learn how to build, optimize, and scale high-converting campaigns across all major platforms.",
    thumbnailUrl: "/courses/performance.jpg",
    price: 14999,
    discountedPrice: 11999,
    durationWeeks: 8,
    level: "Intermediate",
    category: "Marketing",
    students: "1,200+",
    rating: 4.8,
    modules: [
      {
        title: "Introduction to Performance Marketing",
        lessons: ["What is Performance Marketing?", "Setting Up Your KPIs", "Understanding Attribution Models"]
      },
      {
        title: "Google Ads Deep Dive",
        lessons: ["Search Campaigns", "Display & Video Ads", "Remarketing Strategies"]
      },
      {
        title: "Meta Ads Mastery",
        lessons: ["The Facebook Pixel", "Audience Targeting", "Creative Optimization"]
      }
    ]
  },
  {
    id: "2",
    title: "AI-Powered SEO Masterclass",
    slug: "ai-seo",
    shortDescription: "Learn how to use ChatGPT and Jasper to dominate search rankings in 2024.",
    description: "SEO has changed. In this course, you'll learn how to leverage artificial intelligence to automate keyword research, content generation, and technical SEO audits.",
    thumbnailUrl: "/courses/ai-seo.jpg",
    price: 9999,
    discountedPrice: 7999,
    durationWeeks: 6,
    level: "All Levels",
    category: "SEO",
    students: "850+",
    rating: 4.9,
    modules: [
      {
        title: "The AI Revolution in SEO",
        lessons: ["Future of Search", "AI Content Tools", "Ethical AI Use"]
      },
      {
        title: "Keyword Research with AI",
        lessons: ["Clustering with ChatGPT", "Intent Analysis", "Semantic Search"]
      }
    ]
  },
  {
    id: "3",
    title: "Digital Branding & Storytelling",
    slug: "branding-storytelling",
    shortDescription: "Build a brand that people love and remember through creative thinking.",
    description: "Go beyond logos and colors. Learn the psychological art of storytelling and how to build a brand that resonates with the human experience.",
    thumbnailUrl: "/courses/branding.jpg",
    price: 12499,
    durationWeeks: 10,
    level: "Beginner",
    category: "Branding",
    students: "2,100+",
    rating: 4.7,
    modules: [
      {
        title: "Fundamentals of Branding",
        lessons: ["Brand Identity", "Voice & Tone", "Visual Language"]
      },
      {
        title: "The Art of Storytelling",
        lessons: ["Archetypes", "The Hero's Journey", "Emotional Triggers"]
      }
    ]
  }
];
