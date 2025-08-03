<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestion des Factures</h1>
     <NuxtLink to="/facture" class="items-center px-6 py-3 font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 ">
      <i class="fas fa-add"> </i>  Nouvelle facture 
     </NuxtLink>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class=" flex gap-4 bg-indigo-100 p-4  justify-center rounded-lg shadow text-center">
        <i class="fas fa-file-invoice text-blue-600 text-2xl mb-2"></i><p class="text-center text-gray-500 text-sm">Total Factures</p>
        
      </div>
      <div class="flex gap-4 bg-green-100 p-4  justify-center rounded-lg shadow text-center">
        <i class="fas fa-check-circle text-green-600 text-2xl mb-2"></i>
        <p class="text-gray-500 text-sm">Payées</p>
      
      </div>
      <div class="flex gap-4 bg-yellow-100 p-4 justify-center rounded-lg shadow text-center">
        <i class="fas fa-clock text-yellow-500 text-2xl mb-2"></i>
        <p class="text-gray-500 text-sm">En attente</p>
       
      </div>
      <div class="flex gap-4 bg-purple-100 p-4 justify-center rounded-lg shadow text-center">
        <i class="fas fa-xof-sign text-purple-600 text-2xl mb-2"></i>
        <p class="text-gray-500 text-sm">Montant Total</p>
       
      </div>
    </div>

    <!-- Tableau des factures -->
    <div class="bg-white shadow overflow-x-auto">
      <table class="w-full  border border-black text-sm">
        <thead class="bg-gray-50">
          <tr class="bg-gray-200">
            <th class=" border border-gray-500 px-4 py-2 text-center uppercase">Facture</th>
            <th class="border border-gray-500 px-4 py-2 text-center uppercase">Client</th>
            <th class="border border-gray-500 px-4 py-2 text-center uppercase">Montant TTC</th>
            <th class="border border-gray-500 px-4 py-2 text-center uppercase">Date</th>
            <th class="border border-gray-500 px-4 py-2 text-center uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoiceStore.facture" :key="invoice.id" class=" bg-indigo-50 hover:bg-gray-50">
            <td class="border border-gray-500 text-center uppercase px-4 py-2">{{ invoice.ref}}</td>
            <td class="border border-gray-500 text-center uppercase px-4 py-2">{{ invoice.client.first_name}} {{invoice.client.last_name}}</td>
            <td class="border border-gray-500 text-center uppercase px-4 py-2 font-semibold">{{ formatCurrency(invoice.total)}}</td>
            <td class="border border-gray-500 text-center uppercase px-4 py-2 font-semibold">{{invoice.date}}</td>
            <!-- <td class="border border-gray-500 text-center uppercase px-4 py-2">
              <span :class="statusClass(facture.status)">{{ facture.status }}</span>
            </td> -->
            <td class="border border-gray-300 px-4 py-2 text-center space-x-3 flex justify-center">
                <!-- Voir -->
                 <div class="relative group">
                    <button class="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out">
                        <i class="fas fa-eye"></i><span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Voir</span>
                    </button>
                 </div>
                <!-- Supprimer -->
                 <div class="relative group ">
                    <button @click="deleteFacture(invoice.id)" class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition duration-150 ease-in-out">
                        <i class="fas fa-trash"></i><span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Supprimer</span>
                    </button>
                </div>
                <!-- Télécharger -->
                <div class="relative group">
                    <button @click="downloadFacture(invoice.id)"class="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition duration-150 ease-in-out">
                    <i class="fas fa-download"></i></button>
                        <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Télécharger facture(pdf)</span>
                </div>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout:'default'
})
import { ref, computed } from 'vue'
import { useInvoiceStore } from '~/stores/invoice'
import { onMounted } from 'vue'




const invoiceStore=useInvoiceStore()
onMounted(()=> {
  invoiceStore.fetchInvoice()
} )




const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')
const formatCurrency = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount)

</script>
