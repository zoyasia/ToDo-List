import { defineStore } from 'pinia'

// convention de nommage = useNomDuStore
export const useTaskStore = defineStore('taskStore', {
    state:()=> ({
        tasks:[
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
        ]
    })

})