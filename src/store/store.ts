import { defineStore } from 'pinia'
import axios from 'axios';

export interface Task {
  id: number,
  title: string,
  description: string,
  deadline: string,
  status: string,
  selected: boolean,
}

// convention de nommage = useNomDuStore
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    
    tasks: [] as Task[],
    searchText: '',
    newTask: '',
    selectedStatus: 'all',
  }),

  actions: {
    setStatus(status: string) {
      this.selectedStatus = status;
    },

    // fetchTasks(){
    //   axios.get<Task[]>("http://localhost:8000/tasks")
    //   .then(response => {
    // // en cas de réussite de la requête
    // this.tasks = response.data;
    // console.log(this.tasks);
    //   })
    //   .catch(error => {
    // // en cas d’échec de la requête
    //     console.error('Erreur lors de la requête API', error);
    //   });
    // },

    // version avec async/await:
      async fetchTasks() {
        try {
          const response = await axios.get<Task[]>("http://localhost:8000/tasks");
          this.tasks = response.data;
          console.log(this.tasks);
          return true;
        } catch (error) {
          console.error('Erreur lors de la requête API', error);
          return false;
        }
      },



  },


  getters: {

    getTasks(state): Task[]{
      return state.tasks
    },

    filtered(state) : Task[]{
      // je duplique le tableau
      let tasksToFilter = state.tasks;
      this.selectedStatus = state.selectedStatus;
      console.log(state.selectedStatus);


      // si la barre de recherche n'est pas vide
      if (state.searchText.trim() !== '') {
        tasksToFilter = tasksToFilter.filter(item =>
          item.title.toLowerCase().includes(state.searchText.toLowerCase())
        );
      };
      console.log(tasksToFilter);


      // si j'ai un statut !all, je filtre et retourne
      if (state.selectedStatus !== 'all') {
        tasksToFilter = tasksToFilter.filter(item => item.status === state.selectedStatus
        );
      }
      console.log(tasksToFilter.filter(item => item.status === state.selectedStatus));

      //je retourne le tableau
      return tasksToFilter;
    },

  },
})

