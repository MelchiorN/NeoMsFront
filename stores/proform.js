import { defineStore } from "pinia";
 export const useProformaStore= defineStore('proforma',{
    state:()=>({
        proforma:[],
    }),
    actions:{
        async addProforma(payload){
            try{
                const response= await $fetch('http://127.0.0.1:8000/api/proforma',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json',
                    },  
                    body:payload
                });
            }catch(error){
                console.error("Erreur d'enregistrement de facture",error);
            }
        },
         async fetchProforma(){
            try{
                this.proforma= await $fetch('http://127.0.0.1:8000/api/proforma');
            

            }catch(error){
                console.error("Erreur lors de l'affichage",error);
                
            }
         }
    }
 })