const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://gxekskiujrynlwxlpfcu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZWtza2l1anJ5bmx3eGxwZmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTYyNzIsImV4cCI6MjA5NTAzMjI3Mn0.0NjCqCwORU-qi2PTLt7INyY0dnpUaVjuhCcCDO_67cw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Checking if user_profiles table exists in Supabase...");
  try {
    const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
    if (error) {
      console.error("Database query failed:", error);
    } else {
      console.log("Database connection successful! Table exists. Data:", data);
    }
  } catch (err) {
    console.error("Caught error during test:", err);
  }
}

test();
