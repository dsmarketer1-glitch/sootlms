import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-admin-key';

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin database features will not work.');
}

// Admin client that bypasses Row Level Security
// DANGER: Never expose this to the client-side! Only use in API routes or Server Actions.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
