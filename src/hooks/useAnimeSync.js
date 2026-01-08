import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAnimeSync() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Get device ID (creates one if it doesn't exist)
  const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  const deviceId = getDeviceId();

  // Load animes from Supabase
  const loadAnimes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('animes')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setAnimes(data.map(anime => ({
          id: anime.id,
          name: anime.name,
          totalEpisodes: anime.total_episodes,
          watchedEpisodes: anime.watched_episodes,
          completed: anime.completed,
          emoji: anime.emoji,
        })));
      }
    } catch (error) {
      console.error('Error loading animes:', error);
      // Fallback to localStorage if Supabase fails
      const saved = localStorage.getItem('animeList');
      if (saved) setAnimes(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  // Add anime to Supabase
  const addAnime = async (animeData) => {
    try {
      setSyncing(true);
      const newAnime = {
        name: animeData.name,
        total_episodes: animeData.totalEpisodes || 0,
        watched_episodes: animeData.watchedEpisodes || 0,
        completed: animeData.completed || false,
        emoji: animeData.emoji,
        device_id: deviceId,
      };

      const { data, error } = await supabase
        .from('animes')
        .insert([newAnime])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const formattedAnime = {
          id: data.id,
          name: data.name,
          totalEpisodes: data.total_episodes,
          watchedEpisodes: data.watched_episodes,
          completed: data.completed,
          emoji: data.emoji,
        };
        setAnimes(prev => [formattedAnime, ...prev]);
        return formattedAnime;
      }
    } catch (error) {
      console.error('Error adding anime:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Update anime in Supabase
  const updateAnime = async (id, updates) => {
    try {
      setSyncing(true);
      const { error } = await supabase
        .from('animes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setAnimes(prev =>
        prev.map(anime =>
          anime.id === id ? { ...anime, ...updates } : anime
        )
      );
    } catch (error) {
      console.error('Error updating anime:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Delete anime from Supabase
  const deleteAnime = async (id) => {
    try {
      setSyncing(true);
      const { error } = await supabase
        .from('animes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAnimes(prev => prev.filter(anime => anime.id !== id));
    } catch (error) {
      console.error('Error deleting anime:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Load animes on mount
  useEffect(() => {
    loadAnimes();
  }, []);

  // Backup to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('animeList', JSON.stringify(animes));
    }
  }, [animes, loading]);

  return {
    animes,
    loading,
    syncing,
    addAnime,
    updateAnime,
    deleteAnime,
    refreshAnimes: loadAnimes,
  };
}
