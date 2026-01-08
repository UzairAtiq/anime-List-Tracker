import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymaodehnrrcakmswbkyz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYW9kZWhucnJjYWttc3dia3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTA2NzksImV4cCI6MjA4MzQyNjY3OX0.wjCF79XqOYNgdDzQuVfM6jlFOqshQERtPNKacIusBCo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
