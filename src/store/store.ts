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

    APIUrl: "http://localhost:8000",
    tasks: [] as ITask[],
    searchText: '',
    newTask: '',
    newDescription: '',
    newDeadline: '',
    selectedStatus: 'all',
  }),

  actions: {

    setStatus(status: string) {
      this.selectedStatus = status;
    },

    async fetchTasks() {
      try {
        const response = await axios.get<ITask[]>(this.APIUrl + '/tasks');
        this.tasks = response.data;

        return true;
      } catch (error) {
        console.error('Erreur lors de la requête API', error);
        return false;
      }
    },

    async addTask(newTask: string, newDescription: string, newDeadline: string) {
      if (newTask.trim() !== '') {
        try {
          await axios.post(this.APIUrl + '/new', {
            title: newTask,
            description: newDescription,
            deadline: newDeadline,
          });
          this.fetchTasks();
          return true;
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la tâche', error);
          return false;
        }
      }
    },

    async removeTask (id:number) {
      try{
        await axios.delete(this.APIUrl + '/delete/' + id)
        this.fetchTasks();
      } catch (error) {
        console.error(`Erreur lors de la suppression de la tâche avec l'ID ${id}`, error);
      }
    }
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

