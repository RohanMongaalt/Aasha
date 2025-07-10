-- Create mood_entries table
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood INTEGER CHECK (mood BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date) -- Only one entry per user per day
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  datetime TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  psychologist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  pin TEXT NOT NULL UNIQUE, -- 6-digit PIN
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT pin_length CHECK (LENGTH(pin) = 6 AND pin ~ '^[0-9]+$')
);

-- Create meditation_files table
CREATE TABLE public.meditation_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for guided meditations
INSERT INTO storage.buckets (id, name, public) VALUES ('guided_meditations', 'guided_meditations', true);

-- Enable Row Level Security on all tables
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for mood_entries
CREATE POLICY "Users can view their own mood entries" ON public.mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood entries" ON public.mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood entries" ON public.mood_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for tasks
CREATE POLICY "Users can view their own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON public.tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for patients
CREATE POLICY "Psychologists can view their own patients" ON public.patients
  FOR SELECT USING (auth.uid() = psychologist_id);

CREATE POLICY "Psychologists can insert their own patients" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = psychologist_id);

CREATE POLICY "Psychologists can update their own patients" ON public.patients
  FOR UPDATE USING (auth.uid() = psychologist_id);

CREATE POLICY "Psychologists can delete their own patients" ON public.patients
  FOR DELETE USING (auth.uid() = psychologist_id);

-- Create RLS policies for meditation_files
CREATE POLICY "Anyone can view meditation files" ON public.meditation_files
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert meditation files" ON public.meditation_files
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- Create RLS policies for storage
CREATE POLICY "Public access to guided meditations" ON storage.objects
  FOR SELECT USING (bucket_id = 'guided_meditations');

CREATE POLICY "Authenticated users can upload guided meditations" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'guided_meditations' AND auth.uid() IS NOT NULL);