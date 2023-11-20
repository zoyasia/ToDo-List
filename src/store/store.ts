import { defineStore } from 'pinia'

// convention de nommage = useNomDuStore
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'RDV dentiste',
        description: 'Rendez-vous chez le dentiste pour un contrôle.',
        deadline: '2023-12-31',
        status: 'à faire',
        selected: false,
      },
      {
        id: 2,
        title: 'Plantes',
        description: 'Arroser avant de partir',
        deadline: '2023-11-25',
        status: 'à faire',
        selected: false,
      },
      {
        id: 3,
        title: 'Anniv Léna',
        description: 'Trouver un cadeau',
        deadline: '2023-05-14',
        status: 'terminée',
        selected: true,
      }
    ],
    searchText: '',
    newTask: '',
    selectedStatus: 'all',
  }),

  actions: {
    setStatus(status: string) {
      this.selectedStatus = status;
    },
  },
  

  getters: {
    // filterListByStatus(state) {
    //   if (state.selectedStatus === 'all') {
    //     return state.tasks;
    //   } else {
    //     return state.tasks.filter((item) => item.status === state.selectedStatus);
    //   }
    // },

    // filterListByName(state) {
    //   if (state.searchText.trim() === '') {
    //     return state.tasks;
    //   } else {
    //     return state.tasks.filter((item) =>
    //       item.title.toLowerCase().includes(state.searchText.toLowerCase())
    //     );
    //   }
    // },

    filtered(state) {
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