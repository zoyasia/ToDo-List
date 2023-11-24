import { defineStore } from 'pinia'
import axios from 'axios';

export interface ITask {
  id: number,
  title: string,
  description: string,
  deadline: string,
  status: string,
  selected: boolean,
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({

    tasks: [] as ITask[],
    searchText: '',
    newTask: '',
    selectedStatus: 'all',
  }),

  actions: {

    setStatus(status: string) {
      this.selectedStatus = status;
    },

    async fetchTasks() {
      try {
        const response = await axios.get<ITask[]>("http://localhost:8000/tasks");
        this.tasks = response.data;

        return true;
      } catch (error) {
        console.error('Erreur lors de la requête API', error);
        return false;
      }
    },

  },


  getters: {

    getTasks(state): ITask[] {
      return state.tasks
    },

    filtered(state): ITask[] {
      // je duplique le tableau
      let tasksToFilter = state.tasks;
      this.selectedStatus = state.selectedStatus;

      // si la barre de recherche n'est pas vide
      if (state.searchText.trim() !== '') {
        tasksToFilter = tasksToFilter.filter(item =>
          item.title.toLowerCase().includes(state.searchText.toLowerCase())
        );
      };

      // si j'ai un statut !all, je filtre et retourne
      if (state.selectedStatus !== 'all') {
        tasksToFilter = tasksToFilter.filter(item => item.status === state.selectedStatus
        );
      }

      //je retourne le tableau
      return tasksToFilter;
    },

  },
})

