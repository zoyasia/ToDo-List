import { defineStore } from 'pinia'
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';

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
    newDescription: '',
    newDeadline: '',
    selectedStatus: 'all',
  }),

  actions: {

    setStatus(status: string) {
      this.selectedStatus = status;
    },

    applyFilterByName: function (query: string) {
      this.searchText = query;
    },

    async fetchTasks() {
      try {
        const tasks = await fetchTasks();
        this.tasks = tasks;
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches dans le store', error);
      }
    },

    async addTask(newTask: string, newDescription: string, newDeadline: string) {
      if (newTask.trim() !== '') {
        try {
          const newTaskData = {
            title: newTask,
            description: newDescription,
            deadline: newDeadline,
          };
          await createTask(newTaskData);
          this.fetchTasks();
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la tâche dans le store', error);
        }
      }
    },

    async removeTask(id: number) {
      try {
        await deleteTask(id);
        this.fetchTasks();
      } catch (error) {
        console.error(`Erreur lors de la suppression de la tâche avec l\'ID ${id}`, error);
      }
    },

    async updateTask(id: number, updatedData: Partial<ITask>) {
      try {
        await updateTask(id, updatedData);
        this.fetchTasks();
      } catch (error) {
        console.error('Erreur lors de la modification de la tâche avec l\'ID:' + id, error);
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

