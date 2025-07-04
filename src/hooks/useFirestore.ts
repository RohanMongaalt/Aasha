import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
  createdAt: Timestamp;
}

export interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  repeat: string;
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}

export interface MoodEntry {
  id: string;
  mood: number;
  note?: string;
  userId: string;
  createdAt: Timestamp;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  patientId: string;
  psychologistId: string;
  createdAt: Timestamp;
}

export const useFirestore = () => {
  // Journal Entries
  const addJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'journalEntries'), {
        ...entry,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      throw error;
    }
  };

  const useJournalEntries = (userId: string) => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!userId) return;

      const q = query(
        collection(db, 'journalEntries'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JournalEntry[];
        setEntries(entriesData);
        setLoading(false);
      });

      return () => unsubscribe();
    }, [userId]);

    return { entries, loading };
  };

  // Tasks
  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), updates);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const useTasks = (userId: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!userId) return;

      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Task[];
        setTasks(tasksData);
        setLoading(false);
      });

      return () => unsubscribe();
    }, [userId]);

    return { tasks, loading };
  };

  // Mood Entries
  const addMoodEntry = async (mood: Omit<MoodEntry, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'moodEntries'), {
        ...mood,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding mood entry:', error);
      throw error;
    }
  };

  const useMoodEntries = (userId: string) => {
    const [entries, setEntries] = useState<MoodEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!userId) return;

      const q = query(
        collection(db, 'moodEntries'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MoodEntry[];
        setEntries(entriesData);
        setLoading(false);
      });

      return () => unsubscribe();
    }, [userId]);

    return { entries, loading };
  };

  // Goals
  const addGoal = async (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'goals'), {
        ...goal,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      throw error;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    try {
      await updateDoc(doc(db, 'goals', goalId), updates);
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  };

  const useGoals = (patientId: string) => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!patientId) return;

      const q = query(
        collection(db, 'goals'),
        where('patientId', '==', patientId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const goalsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Goal[];
        setGoals(goalsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }, [patientId]);

    return { goals, loading };
  };

  return {
    addJournalEntry,
    useJournalEntries,
    addTask,
    updateTask,
    useTasks,
    addMoodEntry,
    useMoodEntries,
    addGoal,
    updateGoal,
    useGoals
  };
};