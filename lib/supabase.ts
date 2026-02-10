import { createClient } from '@supabase/supabase-js';

// Senin proje adresin:
const supabaseUrl = "https://fegitkhxlrsxpizckgoj.supabase.co";

// Az önce bulduğun anahtar:
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ2l0a2h4bHJzeHBpemNrZ29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjkzODAsImV4cCI6MjA4NjMwNTM4MH0.qPNwKPSdM6fBTKAsro5LNolAevnL0FnU7AlKNRAw8Zc";

export const supabase = createClient(supabaseUrl, supabaseKey);