import { defineStore } from 'pinia'
import axios from 'axios';

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

    fetchTasks(){
      axios.get("http://localhost:8000/tasks")
      .then(response => {
    // en cas de réussite de la requête
    let tasksAPI = response.data;
    console.log(tasksAPI);
      })
      .catch(error => {
    // en cas d’échec de la requête
        console.error('Erreur lors de la requête API', error);
      });
    }

    // tentative de changer cette fonction pour meilleure gestion erreurs, mais msg erreur: Uncaught (in promise) TypeError: tasksToFilter.filter is not a function.
    //[Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug.
    // async fetchTasks(){
    //   try {
    //   const response = await axios.get('http://localhost:8000/tasks');
    //   this.tasks = response.data;
    //   } catch (error) {
    //   console.error('Erreur lors de la récupération des tâches depuis l\'API', error);
    //   }
    //   },


  },


  getters: {

    // récupérer le tableau de tasks du fetchTasks
    getTasks(state){
      return state.tasks
    },

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