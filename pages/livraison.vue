<template>
  <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <!-- Titre -->
    <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0zm-4-2V6a1 1 0 00-1-1H3a1 1 0 00-1 1v9a1 1 0 001 1h1a4 4 0 008 0h4a4 4 0 008 0h1a1 1 0 001-1v-4a1 1 0 00-1-1h-3z"/>
      </svg>
      Générer un bordereau de livraison
    </h1>

    <!-- Type de livraison -->
    <div>
      <label class="block font-semibold text-gray-700 mb-2">Type de livraison *</label>
      <select v-model="livraisonType" class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500">
        <option value="">-- Sélectionner --</option>
        <option value="complete">Livraison complète</option>
        <option value="partielle">Livraison partielle</option>
      </select>
    </div>

    <!-- Formulaire -->
    <div v-if="livraisonType" class="space-y-6">
      <!-- Client -->
      <div>
        <label class="block font-semibold mb-2">Client</label>
        <select v-model="form.client" class="w-full border border-gray-300 p-2 rounded-md">
          <option value="">-- Sélectionner --</option>
          <option v-for="c in clients" :key="c.id" :value="c.name">{{ c.name }}</option>
        </select>
      </div>

      <!-- Infos livraison -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Date de livraison</label>
          <input type="date" v-model="form.date" class="w-full border border-gray-300 p-2 rounded-md"/>
        </div>
        <div>
          <label class="block mb-1">Adresse de livraison</label>
          <input type="text" v-model="form.address" class="w-full border border-gray-300 p-2 rounded-md"/>
        </div>
      </div>

      <!-- Articles -->
      <div>
        <h3 class="font-semibold mb-2">Articles à livrer</h3>
        <table class="w-full border border-gray-300 text-sm rounded-md overflow-hidden">
          <thead>
            <tr class="bg-indigo-50 text-indigo-700 uppercase text-xs font-semibold">
              <th class="p-2 text-left">Désignation</th>
              <th class="p-2 text-center">Qté</th>
              <th class="p-2 text-center">Observations</th>
              <th class="p-2 text-center">Supp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index" class="border-t">
              <td><input v-model="item.name" class="border w-full p-1 rounded-md"/></td>
              <td><input type="number" v-model.number="item.qty" class="border w-full p-1 text-center rounded-md"/></td>
              <td><input v-model="item.note" class="border w-full p-1 rounded-md"/></td>
              <td class="text-center">
                <button class="text-red-500 hover:text-red-700" @click="removeItem(index)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="addItem" class="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200">
          <i class="fas fa-plus"></i> Ajouter un article
        </button>
      </div>

      <!-- Zone Observation -->
      <div>
        <label class="block mb-1">Observations</label>
        <textarea v-model="form.observation" rows="3" class="w-full border border-gray-300 p-2 rounded-md"></textarea>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 border-t pt-4">
      <button @click="" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Annuler</button>
      <button @click="" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Générer le bordereau
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref } from 'vue'

const livraisonType = ref('')
const clients = ref([
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' }
])

const form = ref({
  client: '',
  date: '',
  address: '',
  observation: '',
  items: [{ name: '', qty: 1, note: '' }]
})

const addItem = () => form.value.items.push({ name: '', qty: 1, note: '' })
const removeItem = (i) => form.value.items.splice(i, 1)

</script>
