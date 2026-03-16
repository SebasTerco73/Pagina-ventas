import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://oboeyxvpcplodguqobpw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib2V5eHZwY3Bsb2RndXFvYnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDY3OTUsImV4cCI6MjA4OTE4Mjc5NX0.6idfkr8bpEzZZUeeq4eHSJM3L23ynaXDQozIhazhxNA'
)