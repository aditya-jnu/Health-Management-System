import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://znewxsrzxocwwniuvofy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZXd4c3J6eG9jd3duaXV2b2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwOTUwNjEsImV4cCI6MjA1MTY3MTA2MX0.prFb4AvZ_SVbkbbIw9sP7CM6gvgZRHXI86BxYke_f0M';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);