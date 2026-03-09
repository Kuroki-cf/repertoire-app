import { createClient } from "@supabase/supabase-js";

// 👇 あなたのSupabaseのURLとAPIキーを貼り付けます
const supabaseUrl = "https://eqmvlcsgenjidbqqshxr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbXZsY3NnZW5qaWRicXFzaHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NDM4OTQsImV4cCI6MjA4ODUxOTg5NH0.Exud8W0VErb0PxQ1perkYD_BjqUHSRA0In4MCFmEaCs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
