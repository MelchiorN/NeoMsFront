<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- Titre -->
    <h1 class="text-2xl font-bold text-gray-800">Gestion des Clients</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-indigo-100 p-4 rounded-xl border-l-4 border-blue-900 shadow text-center">
        <h3 class="text-lg font-semibold text-indigo-700">Total Clients</h3>
       
        <p class="text-3xl font-bold">{{clientStore.stat.total}}</p>
      </div>
      <div class="bg-green-100 p-4 rounded-xl border-l-4 border-green-800 shadow text-center">
        <h3 class="text-lg font-semibold text-green-700">Clients Physiques</h3>
        <p class="text-3xl font-bold">{{clientStore.stat.physique}}</p>
      </div>
      <div class="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-800 h-[100px] shadow text-center">
        <h3 class="text-lg font-semibold text-yellow-700">Clients Moraux</h3>
        <p class="text-3xl font-bold">{{clientStore.stat.moral}}</p>
      </div>
    </div>

    <!-- Liste des Clients -->
    <div class="bg-white border p-4 rounded-lg shadow mt-6">
      <div class="flex justify-between mb-4">
        <h2 class="text-lg font-semibold">Liste des Clients</h2>
        <button @click="showModal = true" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          <i class="fas fa-plus"></i> Nouveau Client
        </button>
      </div>

      <table class="w-full border border-gray-300 text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">Nom</th>
            <th class="border border-gray-300 p-2">Prénom</th>
            <th class="border border-gray-300 p-2">Email</th>
            <th class="border border-gray-300 p-2">Téléphone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clientStore.clients" :key='client.id' class="border-t">
            <td class="border border-gray-300 text-center p-2">{{client.last_name}}</td>
            <td class="border border-gray-300 text-center p-2">{{client.first_name}}</td>
            <td class="border border-gray-300 text-center p-2">{{client.email}}</td>
            <td class="border border-gray-300 text-center p-2">{{client.phone}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Popup Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
      <div class="bg-white backdrop-blur-md p-6 rounded-lg w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Enregistrer un client</h3>

        <div class="space-y-4">
          <select v-model="newClient.type" class="w-full border border-black  p-2 rounded-[15px]">
            <option value="">Type de Client</option>
            <option value="Physique">Physique</option>
            <option value="Moral">Moral</option>
          </select>

          <!-- Client Physique -->
          <div v-if="newClient.type === 'Physique'" class="space-y-3">
            <input v-model="newClient.name" type="text" placeholder="Nom" class="w-full border border-black  p-2 rounded-[15px]" />
            <input v-model="newClient.prenom" type="text" placeholder="Prénom" class="w-full border border-black  p-2 rounded-[15px]" />
            <input v-model="newClient.email" type="email" placeholder="Email" class="w-full border border-black  p-2 rounded-[15px]" />
            <input v-model="newClient.phone" type="text" placeholder="Téléphone" class="w-full border border-black  p-2 rounded-[15px]" />
          </div>

          <!-- Client Moral -->
          <div v-if="newClient.type === 'Moral'" class="space-y-3 bg-white backdrop-blur-md ">
            <input v-model="newClient.raisonSociale" type="text" placeholder="Raison Sociale" class="w-full border border border-black  p-2 rounded-[15px]" />
            <input v-model="newClient.email" type="email" placeholder="Email" class="w-full border border-black p-2 rounded-[15px]" />
            <input v-model="newClient.phone" type="text" placeholder="Téléphone" class="w-full border border-black p-2 rounded-[15px]" />
          </div>
        </div>

        <div class="flex justify-end mt-4 gap-2">
          <button @click="showModal = false" class="px-4 py-2 bg-red-300 rounded-[15px] hover:bg-red-700 hover:text-white">Annuler</button>
          <button @click="" class="px-4 py-2 bg-blue-600 text-white rounded-[15px] hover:bg-blue-900 hover:text-white">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue'
import {useClientStore} from '~/stores/customer'
import {onMounted} from 'vue'


const showModal = ref(false)
const newClient = ref({
  type: '',
  name: '',
  prenom: '',
  raisonSociale: '',
  rccm: '',
  ifu: '',
  email: '',
  phone: ''
})


const clientStore = useClientStore()

onMounted(() => {
  clientStore.fetchClients() ;
  clientStore.fetchStats();
})

</script>
