import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wyltcaehukingbbfyuhj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5bHRjYWVodWtpbmdiYmZ5dWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2NjA3NjksImV4cCI6MjAwNDIzNjc2OX0.I-osbSpRzJLyW3UeuZjvqno4cnfBN5AIV-q2ptgQO0w";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
