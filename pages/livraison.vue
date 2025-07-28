<template>
  <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <!-- Titre -->
    <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
      <i class="fas fa-truck text-indigo-600"></i>
      Générer un bordereau de livraison
    </h1>
    <div class="flex items-center space-x-[400px] ">
       <!-- Sélection commande -->
      <div>
        <label class=" font-semibold mb-2">Commande <span class="text-red-700">*</span></label>
        <select v-model="selectedCommande" @change="loadCommande" class="border border-black w-full p-2 rounded-lg">
          <option value="">-- Sélectionner une commande --</option>
          <option v-for="cmd in commandes" :key="cmd.id" :value="cmd.id">
            {{ cmd.ref }} - {{ cmd.client }}
          </option>
        </select>
      </div>

      <!-- Type de livraison -->
      <div>
        <label class="block font-semibold mb-2">Type de livraison <span class="text-red-700">*</span></label>
        <select v-model="livraisonType" class="border border-black  w-full p-2 rounded-lg">
          <option value="">-- Choisir --</option>
          <option value="complete">Livraison complète</option>
          <option value="partielle">Livraison partielle</option>
        </select>
      </div>        
    </div>
   

    <!-- Formulaire -->
    <div v-if="selectedCommande && livraisonType" class="space-y-6">
      <!-- Infos livraison -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Date de livraison</label>
          <input type="date" v-model="form.date" class="w-full border border-black  p-2 rounded-md"/>
        </div>
        <div>
          <label class="block mb-1">Adresse de livraison</label>
          <input type="text" v-model="form.address" class="w-full border border-black  p-2 rounded-md"/>
        </div>
      </div>

      <!-- Articles -->
      <div>
        <h3 class="font-semibold mb-2">Articles à livrer</h3>
        <table class="w-full border border-gray-300 text-sm rounded-md overflow-hidden">
          <thead>
            <tr class="bg-indigo-300 text-blue-700 uppercase text-xs font-semibold">
              <th class="p-2 text-center">Code Produit</th>
              <th class="p-2 text-center">N° Série</th>
              <th class="p-2 text-center">Qte</th>
              <th v-if="livraisonType ==='partielle'" class="p-2 text-center">Qte Livrée</th>
              <th v-if="livraisonType === 'partielle'" class="p-2 text-center">Qté Restante</th>
              <th class="p-2 text-center">Supp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index" class="border-t">
              <td><input v-model="item.code" class="border border-black  text-center w-full p-1 rounded-md"/></td>
              <td><input v-model="item.serial" class="border border-black text-center w-full p-1 rounded-md"/></td>
              <td><input type="number" v-model.number="item.qtyCommandee" class="border border-black  w-full p-1 text-center rounded-md" /></td>
              <td v-if="livraisonType==='partielle'"><input type="number" v-model.number="item.qtyLivree" class="border border-black w-full p-1 text-center rounded-md" /></td>
              <td v-if="livraisonType === 'partielle'" class="text-center">
                {{ (item.qtyCommandee - item.qtyLivree) < 0 ? 0 : (item.qtyCommandee - item.qtyLivree) }}
              </td>
              <td class="text-center">
                <button class="text-red-500 hover:text-red-700" @click="removeItem(index)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="addItem" class="mt-2 px-3 py-1 bg-indigo-300 text-blue-700 rounded-md hover:bg-blue-800 hover:text-white">
          <i class="fas fa-plus"></i> Ajouter un article
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 border-t pt-4">
      <button class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Annuler</button>
      <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Générer le bordereau</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref } from 'vue'

const livraisonType = ref('')
const selectedCommande = ref('')
const commandes = ref([
  {
    id: 1,
    ref: 'CMD-001',
    client: 'Client A',
    address: 'Lomé',
    items: [
      { code: 'P001', serial: 'SN-123', qtyCommandee: 10, qtyLivree: 0 }
    ]
  },
  {
    id: 2,
    ref: 'CMD-002',
    client: 'Client B',
    address: 'Kara',
    items: [
      { code: 'P002', serial: 'SN-456', qtyCommandee: 5, qtyLivree: 0 }
    ]
  }
])

const form = ref({
  client: '',
  date: '',
  address: '',
  items: []
})

const loadCommande = () => {
  const cmd = commandes.value.find(c => c.id === selectedCommande.value)
  if (cmd) {
    form.value.client = cmd.client
    form.value.address = cmd.address
    form.value.items = [...cmd.items]
  }
}

const addItem = () => form.value.items.push({ code: '', serial: '', qtyCommandee: 1, qtyLivree: 0 })
const removeItem = (i) => form.value.items.splice(i, 1)
</script>
