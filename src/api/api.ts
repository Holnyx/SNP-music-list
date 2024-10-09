import { MusicItem } from '@/store/types';

export const API_URL = 'http://localhost:3001/music';

const api = {
  addMusic: async (newMusic: MusicItem) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newMusic),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding music:', error);
    }
  },

  updateMusic: async (id: string, updatedSong: MusicItem) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedSong),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating music:', error);
    }
  },

  deleteMusic: async (payload: { musicId: string }) => {
    try {
      await fetch(`${API_URL}/${payload.musicId}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting music:', error);
    }
  },

  getAllMusic: async () => {
    try {
      const response = await fetch(`${API_URL}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  },
  getMusicById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching music by id:', error);
    }
  },
};

export default api;
