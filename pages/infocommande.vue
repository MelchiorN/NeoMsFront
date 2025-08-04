<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Titre et bouton -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900">Gestion des Commandes</h1>
      <NuxtLink to="/commande"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out" >
        <i class="fas fa-add w-8"></i>Nouvelle commande
      </NuxtLink>
    </div>

    <!-- Section des statistiques (cartes) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class=" flex  gap-4 bg-indigo-100 p-6 rounded-lg text-center shadow-md border-l-4 border-blue-500">
        <i class="fas fa-box text-blue-600 text-3xl "></i><p class="text-sm font-medium text-center text-gray-500">Total des Commandes</p>
        <p class="mt-1 text-4xl  text-center font-extrabold text-gray-900"></p>
      </div>
      <div class="flex gap-4 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
         <i class="fas fa-spinner text-yellow-500 text-3xl  "></i><p class="text-sm font-medium text-center text-gray-500">Commandes En Cours</p>
        <p class="mt-1 text-4xl font-extrabold text-gray-900"></p>
      </div>
      <div flex class=" flex gap-4 bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
         <i class="fas fa-check-circle text-green-600 text-3xl "></i><p class="text-sm  text-center font-medium text-gray-500">Commandes Livrées</p>
        <p class="mt-1 text-4xl text-center font-extrabold text-gray-900"></p>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="w-[300px] bg-indigo-100 p-6 rounded-lg shadow-[10px] mb-8 border border-gray-400"> 
    <!-- Filtre par statut -->
      <div class="w-[200px]">
        <label for="status-filter" >Filtrer par statut</label>
        <select id="status-filter" v-model="selectedStatus " class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md  bg-indigo focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="">Tous les status</option>
          <option value="">En attente</option>
          <option value="livrée">Livrée</option>
          <option value="annulée">Annulée</option>
        </select>
      </div>
    </div>

    <!-- Tableau des Commandes -->
    <div class="bg-white  shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-400 rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="border border-gray-400 px-6 py-3 text-center   text-gray-900 uppercase tracking-wider">REF</th>
              <th scope="col" class="border border-gray-400 px-6 py-3 text-center  font-medium text-gray-900 uppercase tracking-wider">Client</th>
              <th scope="col" class="border border-gray-400 px-6 py-3 text-center  font-medium text-gray-900 uppercase tracking-wider">Statut</th>
              <th scope="col" class="border border-gray-400 relative px-6 py-3 text-center"> Actions </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(order, index) in orderStore.commande"  :key="order.id" class="hover:bg-gray-50 transition duration-150 ease-in-out">
              <td class="border border-gray-400 px-6 py-4  text-center text-sm font-medium text-gray-900">
                {{ 'CMD ' + String(index + 1).padStart(3, '0') }}
              </td>
                <!-- <td>{{ 'CMD ' + String((currentPage - 1) * itemsPerPage + index + 1).padStart(3, '0') }}</td> -->
              <td class="border border-gray-400 px-6 py-4  text-[16px] text-gray-900">{{order.client.last_name}} {{order.client.first_name}}</td>
              <td class="border border-gray-400 px-6 py-4 text-center uppercase">
                <span :class="statusClass(order.status)" class="px-2 py-1 rounded font-semibold">{{ translateStatus(order.status) }}</span>
                <!-- <span :class="statusClass(order.status)" class="px-2 py-1 rounded font-semibold">{{ translateStatus(order.status) }}</span> -->
                  <!-- <span>
                      {{
                        order.status === 'pending' ? 'En attente' : 
                        order.status === 'canceled' ? 'Annulée' :
                        order.status === 'delivery' ? 'Livrée' :
                        order.status
                      }}
                  </span> -->
              </td>

              <!-- <td class="border border-gray-400 border border-gray-400 px-6 py-4  text-sm text-gray-900"></td> -->
              <td class="border border-gray-400 px-6 py-4  text-center text-[16px] font-medium">
                <div class="flex items-center justify-center space-x-2">
                  <!-- voir -->
                  <div class="relative group">
                    <button @click="viewOrder(order.id)" class="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out">
                      <i class="fas fa-eye"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Voir</span>
                  </div>

                  <!--Télécharger -->
                  <div class="relative group">
                    <button @click="downloadOrder(order.id)" class="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition duration-150 ease-in-out">
                      <i class="fas fa-download"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Télécharger pdf</span>
                  </div>

                  <!-- Bouton Modifier -->
                  <div class="relative group">
                    <button @click="editOrder(order.id)" class="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-100 transition duration-150 ease-in-out">
                      <i class="fas fa-edit"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Modifier</span>
                  </div>

                  <!-- Bouton Supprimer -->
                  <div class="relative group">
                    <button @click="deleteOrder" class="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition duration-150 ease-in-out">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Supprimer</span>
                  </div>
                </div>
              </td>
            </tr>
            <!-- <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="text-center py-8 text-gray-500 text-lg">
                <p>Aucune commande trouvée.</p>
                <p class="mt-2 text-sm">Essayez d'ajuster votre recherche ou de créer une nouvelle commande.</p>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
        <!-- Pagination -->
    <div class="flex justify-center items-center space-x-4 mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '~/stores/order'
import {onMounted} from 'vue'

const router = useRouter()

definePageMeta({
  layout: 'default' // Assure que cette page utilise le layout 'default.vue'
})

const orders = ref([
  // { id: 'CMD-001', client: 'Client Alpha', status: 'en cours', amount: 250.00, delivery: '2025-07-30' },
  
])

const search = ref('')

const orderStore =useOrderStore()
onMounted(()=>{
  orderStore.fetchOrder()
})



// Computed property pour le filtrage des commandes
// const filteredOrders = computed(() => {
//   if (!search.value) return orders.value
//   const query = search.value.toLowerCase()
//   return orders.value.filter(o =>
//     o.client.toLowerCase().includes(query) ||
//     o.id.toLowerCase().includes(query) ||
//     o.status.toLowerCase().includes(query) // Permet de rechercher par statut
//   )
// })

// Fonction pour la classe CSS du statut 
const statusClass = (status) => {
  switch (status) {
    case 'pending':      // En attente
      return 'bg-yellow-100 text-yellow-800'
    case 'canceled':     // Annulée
      return 'bg-red-100 text-red-800'
    case 'delivery':     // Livrée
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}


const translateStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'En attente'
    case 'canceled':
      return 'Annulée'
    case 'delivery':
      return 'Livrée'
    default:
      return status
  }
}

// Pagination
const itemsPerPage = 3
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(orderStore.commande.length / itemsPerPage)
})
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return orderStore.commande.slice(start, start + itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}


// Fonctions de formatage
// const formatDate = (dateString) => {
//   if (!dateString) return ''
//   try {
//     const date = new Date(dateString);
//     // Optionnel: ajouter un jour pour corriger le décalage si la date est stockée sans timezone
//     // date.setDate(date.getDate() + 1);
//     return date.toLocaleDateString('fr-FR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   } catch (e) {
//     console.error("Erreur de formatage de la date:", dateString, e);
//     return dateString; // Retourne la chaîne originale si erreur
//   }
// };

// const formatCurrency = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount)



// Fonction pour voir les détails d'une commande (peut naviguer vers une page de détail)
// const viewOrderDetails = (orderId) => {
  // Optionnel: naviguer vers une page de détail de commande
  // router.push(`/commandes/${orderId}`)
  // console.log(`Voir les détails de la commande: ${orderId}`);
  // alert(`Détails de la commande ${orderId} (à implémenter)`);
// }
</script>

