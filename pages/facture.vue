<template>
  <div class="max-w-4xl mx-auto bg-indigo-100 shadow-lg rounded-lg p-6 space-y-6">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
      <i class="fas fa-file-invoice"></i> Générer une facture
    </h1>

    <!-- Sélection type de facture -->
    <div class="w-80  ">
      <label class="  block font-semibold mb-2">Type de facture *</label>
      <select v-model="factureType" class="border border-black w-full p-2 rounded-lg">
        <option value="">-- Choisir --</option>
        <option value="definitive">Facture Définitive</option>
        <option value="acompte">Facture Acompte</option>
        <option value="proforma">Facture Proforma</option>
      </select>
    </div>

    <!-- Formulaire dynamique -->
    <div v-if="factureType">
      <!-- Client -->
      <div>
        <label class="block mb-1">Client</label>
        <select v-model="form.client" class="border border-black w-full border p-2 rounded-lg">
          <option value="">-- Sélectionner --</option>
          <option v-for="c in clients" :key="c.id" :value="c.name">{{ c.name }}</option>
        </select>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4 mt-3">
        <div>
          <label>Date d’émission</label>
          <input type="date" v-model="form.date" class="border border-black w-full  p-2 rounded-lg" />
        </div>
        <div>
          <label>Date d’échéance</label>
          <input type="date" v-model="form.dueDate" class="w-full border p-2 rounded-lg" />
        </div>
      </div>

      <!-- Articles -->
      <div class="mt-4">
        <h3 class="font-semibold mb-2">Articles</h3>
        <table class="w-full text-sm border">
          <thead>
            <tr class="bg-gray-100">
              <th class=" border border-gray-300 p-2">Désignation</th>
              <th class="border border-gray-300 p-2 text-center uppercase">Qté</th>
              <th class="border border-gray-300 p-2 text-center uppercase">PU</th>
              <th class="border border-gray-300 p-2 text-center uppercase">Total</th>
              <th class="border border-gray-300 p-2 text-center uppercase">Supp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index">
              <td><input v-model="item.name" class="border p-1 rounded-lg w-full" /></td>
              <td><input type="number" v-model.number="item.qty" class="border p-1 w-16 text-center" /></td>
              <td><input type="number" v-model.number="item.price" class="border p-1 w-20 text-center" /></td>
              <td class="text-right">{{ (item.qty * item.price).toFixed(2) }} </td>
              <td>
                <button class="text-red-500 hover:text-red-700" @click="removeItem(index)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="addItem" class="mt-2 bg-gray-200 px-3 py-1 rounded-lg">
          <i class="fas fa-plus"></i> Ajouter
        </button>
      </div>

      <!-- Cas spécifique : Acompte -->
      <div v-if="factureType === 'acompte'" class="mt-4 bg-yellow-50 p-3 rounded-lg">
        <label class="block mb-1 font-semibold">Pourcentage d’acompte (%)</label>
        <input type="number" v-model.number="acomptePercent" class="border p-2 rounded w-24 text-center" />
        <p class="mt-1 text-gray-700">
          Montant à payer : <strong>{{ acompteAmount.toFixed(2) }} €</strong>
        </p>
      </div>

      <!-- Totaux -->
      <div class="text-right space-y-1 mt-4">
        <div class="flex justify-end gap-2 items-center">
          <label class="font-medium">TVA (%) :</label>
          <input type="number" v-model.number="tvaRate" class="border p-1 w-16 rounded text-right" />
        </div>
        <p>Sous-total : <strong>{{ subtotal.toFixed(2) }} €</strong></p>
        <p>TVA : <strong>{{ tvaAmount.toFixed(2) }} €</strong></p>
        <p class="text-lg font-bold">Total TTC : {{ total.toFixed(2) }} €</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 mt-6 border-t pt-4">
      <NuxtLink to="/facture" class="px-4 py-2 bg-gray-300 rounded-lg">Annuler</NuxtLink>
      <button @click="saveFacture" :disabled="!factureType" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Enregistrer
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref, computed } from 'vue'

// Type facture
const factureType = ref('')
const clients = ref([
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' }
])

// Formulaire
const form = ref({
  client: '',
  date: '',
  dueDate: '',
  items: [{ name: '', qty: 1, price: 0 }]
})

// TVA et acompte
const tvaRate = ref(20)
const acomptePercent = ref(0)

// Calculs
const subtotal = computed(() => form.value.items.reduce((s, i) => s + (i.qty * i.price), 0))
const tvaAmount = computed(() => (subtotal.value * tvaRate.value) / 100)
const total = computed(() => subtotal.value + tvaAmount.value)
const acompteAmount = computed(() => (subtotal.value * acomptePercent.value) / 100)

// Méthodes
const addItem = () => form.value.items.push({ name: '', qty: 1, price: 0 })

</script>
