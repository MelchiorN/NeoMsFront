import { defineSlots } from "vue";

export const useOrderStore=defineStore('commande',{
    state:()=>({
        commande:[],
    }),
    actions:{
        async addOrder(payload){
            try{
                const response=await $fetch('http://127.0.0.1:8000/api/commande',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                   },
                   body:payload,
                });
                return response; //Reponse pour la gesion dans la vue

            }catch(error){
                console.error("Erreur lors de l'enregistrement de la commande",error)
            }
        },

        async fetchOrder(){
            try{
                this.commande= await $fetch('http://127.0.0.1:8000/api/commande')
            }catch(error){
                console.error("Erreur lors de l'affichage",error)
            }
            
        }
    }
})