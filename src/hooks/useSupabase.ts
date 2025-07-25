import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabase = () => {
  const { toast } = useToast();

  // Mood entries
  const saveMoodEntry = async (mood: number, date: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .upsert({ 
          user_id: userId, 
          mood, 
          date: date 
        }, { 
          onConflict: 'user_id,date' 
        });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving mood",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getMoodEntries = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading mood entries",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };

  // Tasks
  const saveTasks = async (tasks: any[], userId: string) => {
    try {
      // Delete existing tasks and insert new ones
      await supabase.from('tasks').delete().eq('user_id', userId);
      
      const tasksWithUserId = tasks.map(task => ({
        ...task,
        user_id: userId,
        datetime: task.datetime ? new Date(task.datetime).toISOString() : null
      }));

      const { data, error } = await supabase
        .from('tasks')
        .insert(tasksWithUserId);
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving tasks",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getTasks = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('datetime', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };

  const createTask = async (task: any, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...task,
          user_id: userId,
          datetime: task.datetime ? new Date(task.datetime).toISOString() : null
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateTask = async (taskId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Journal entries
  const saveJournalEntry = async (content: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({ 
          user_id: userId, 
          content,
          title: content.slice(0, 50) + (content.length > 50 ? '...' : '')
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving journal entry",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getJournalEntries = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading journal entries",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };

  // Patients
  const createPatient = async (patient: any, psychologistId: string) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert({
          ...patient,
          psychologist_id: psychologistId
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating patient",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getPatients = async (psychologistId: string) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('psychologist_id', psychologistId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading patients",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };

  // Meditation files
  const uploadMeditationFile = async (file: File, title: string, userId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `meditations/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('guided_meditations')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('guided_meditations')
        .getPublicUrl(filePath);

      const { data, error } = await supabase
        .from('meditation_files')
        .insert({
          title,
          file_url: urlData.publicUrl,
          uploaded_by: userId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error uploading meditation file",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getMeditationFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('meditation_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading meditation files",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };
  // Goals
  const saveGoal = async (goal: any, userId: string) => {
    try {
      const goalData = {
        user_id: userId,
        title: goal.title,
        description: goal.description || null,
        target_value: goal.targetValue || null,
        current_progress: goal.progress || 0,
        updated_at: new Date().toISOString()
      };

      // If goal has an ID, include it for upsert
      if (goal.id) {
        goalData.id = goal.id;
      }

      const { data, error } = await supabase
        .from('goals')
        .upsert(goalData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving goal",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const getGoals = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error loading goals",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };
};

  return {
    saveMoodEntry,
    getMoodEntries,
    saveTasks,
    getTasks,
    createTask,
    updateTask,
    saveJournalEntry,
    getJournalEntries,
    createPatient,
    getPatients,
    uploadMeditationFile,
    getMeditationFiles,
    saveGoal,
    getGoals
  };

