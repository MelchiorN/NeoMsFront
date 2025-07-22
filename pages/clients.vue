<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
      <button
        @click="showForm = true"
        class="px-4 py-2 bg-green-500 text-white hover:bg-teal-700 rounded-lg transition-colors flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Nouveau Client</span>
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un client..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="flex space-x-2">
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="nouveau">Nouveau</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Dépensé</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Commande</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span class="text-white font-medium text-sm">
                        {{ client.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                    <div class="text-sm text-gray-500">{{ client.company }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.email }}</div>
                <div class="text-sm text-gray-500">{{ client.phone || 'Non renseigné' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <!-- <span :class="getStatusBadge(client.status)"> -->
                  {{ getStatusText(client.status) }}
                <!-- </span> -->
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(client.totalSpent) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(client.lastOrder) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editClient(client)"
                    class="text-blue-500 hover:text-blue-700"
                    title="Modifier"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteClient(client.id)"
                    class="text-red-600 hover:text-red-800"
                    title="Supprimer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredClients.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun client trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery ? 'Aucun client ne correspond à votre recherche.' : 'Commencez par ajouter un nouveau client.' }}
        </p>
        <div class="mt-6">
          <button
            @click="showForm = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-teal-700"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nouveau Client
          </button>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-[#00000050] flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-y-auto">
        <!-- <ClientForm
          :client="editingClient"
          :mode="editingClient ? 'edit' : 'create'"
          @save="handleFormSubmit"
          @cancel="closeForm"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:'default'
})
import { ref, computed } from 'vue';
// import ClientForm from '@/components/ClientForm.vue'; // Make sure this path is correct

// A basic array to store our clients. In a real app, this would come from a database.
interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'actif' | 'nouveau' | 'inactif';
  totalSpent: number;
  lastOrder: string; // Date string
  createdAt: string; // Date string
}

const clients = ref<Client[]>([
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    company: 'Dupont & Fils',
    phone: '0612345678',
    status: 'actif',
    totalSpent: 1250.75,
    lastOrder: '2025-07-15',
    createdAt: '2024-01-10',
  },
  {
    id: 2,
    name: 'Marie Curie',
    email: 'marie.curie@example.com',
    company: 'InnovTech',
    phone: '0798765432',
    status: 'nouveau',
    totalSpent: 0,
    lastOrder: '2025-07-20',
    createdAt: '2025-07-20',
  },
  {
    id: 3,
    name: 'Pierre Martin',
    email: 'pierre.martin@example.com',
    company: 'Global Solutions',
    phone: '0655554444',
    status: 'inactif',
    totalSpent: 300.00,
    lastOrder: '2024-03-01',
    createdAt: '2023-11-05',
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    company: 'Beta Marketing',
    phone: '0601020304',
    status: 'actif',
    totalSpent: 890.50,
    lastOrder: '2025-06-28',
    createdAt: '2024-05-12',
  },
]);

const showForm = ref(false);
const editingClient = ref<Client | null>(null);
const searchQuery = ref('');
const statusFilter = ref('');

// --- Computed Properties for Filtering ---
const filteredClients = computed(() => {
  let currentClients = clients.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    currentClients = currentClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value) {
    currentClients = currentClients.filter((client) => client.status === statusFilter.value);
  }

  return currentClients;
});

// --- Form and Client Management Functions ---
// const handleFormSubmit = (clientData: Omit<Client, 'id' | 'createdAt' | 'totalSpent' | 'lastOrder'>) => {
//   if (editingClient.value) {
//     // Update existing client
//     const index = clients.value.findIndex((c) => c.id === editingClient.value!.id);
//     if (index !== -1) {
//       clients.value[index] = { ...clients.value[index], ...clientData };
//     }
//   } else {
//     // Add new client
//     const newId = clients.value.length > 0 ? Math.max(...clients.value.map(c => c.id)) + 1 : 1;
//     clients.value.push({
//       id: newId,
//     //   createdAt: new Date().toISOString().split('T')[0], // Current date
//     //   totalSpent: 0,
//     //   lastOrder: new Date().toISOString().split('T')[0], // Current date
//     //   status: 'nouveau', // Default status for new clients
//     //   ...clientData,
//     });
//   }
//   closeForm();
// };

const closeForm = () => {
  showForm.value = false;
  editingClient.value = null; // Clear the client being edited
};

const editClient = (client: Client) => {
  editingClient.value = { ...client }; // Create a copy to avoid direct mutation
  showForm.value = true;
};

const deleteClient = (clientId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
    clients.value = clients.value.filter((client) => client.id !== clientId);
  }
};

// --- Utility Functions for Display ---
// const getStatusBadge = (status: string): string => {
//   const badges: Record<string, string> = {
//     actif: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
//     nouveau: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800',
//     inactif: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800',
//   };
// //   return badges[status] || badges['actif']; // Fallback to 'actif'
// };

const getStatusText = (status: string): string => {
  const texts: Record<string, string> = {
    actif: 'Actif',
    nouveau: 'Nouveau',
    inactif: 'Inactif',
  };
  return texts[status] || status;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
</script>
