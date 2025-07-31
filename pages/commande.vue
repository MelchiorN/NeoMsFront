<template>
  <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Enregistrer une commande</h2>

    <!-- Section Sélection Proforma -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Facture Pro Formas <span class="text-yellow-300">*</span></label>
      <select
        v-model="selectedQuote"
        class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Aucune sélection --</option>
        <option v-for="proforma in proformaStore.proforma" :key="proforma.id" :value="proforma.id">
      
       {{proforma.ref}}: {{ proforma.client.last_name }} - {{ proforma.client.first_name }}
        </option>
      </select>
    </div>


    <!-- Ajouter fichier bon de commande -->
    <div class="border border-dashed border-gray-300 rounded-lg p-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Joindre le bon de commande</label>
      <div class="flex items-center gap-4">
        <label class="cursor-pointer">
          <span class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">Sélectionner un fichier</span>
          <input type="file" @change="handleFileUpload" class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" />
        </label>
        <span v-if="fileName" class="text-sm text-gray-600">
          {{ fileName }}
          <button @click="removeFile" class="ml-2 text-red-500">X</button>
        </span>
      </div>
    </div>

    <!-- Articles -->
    <div>
      <h3 class="text-lg font-semibold mb-3">Articles</h3>
      <table class="w-full border border-gray-300 text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="border border-gray-300 px-2 py-1 text-center">Désignation *</th>
            <th class="border border-gray-300 px-2 py-1 text-center">Qté *</th>
            <th class="border border-gray-300 px-2 py-1 text-center">PU *</th>
            <th class="border border-gray-300 px-2 py-1 text-center">Total</th>
            <th class="border border-gray-300 px-2 py-1 text-center">Supp</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(item, index) in form.items" :key="index">
            <td class="border border-gray-200 "><input v-model="item.name" class="w-full text-center" /></td>
            <td class="border border-gray-200 "><input type="number" v-model.number="item.qty" min="1" class="w-full text-center" /></td>
            <td class="border border-gray-200 "><input type="number" v-model.number="item.price" step="1" class="w-full text-center" /></td>
            <td class="border border-gray-200 ">{{ (item.qty * item.price) }} FCFA</td>
            <td class="border border-gray-200 ">
              <button @click="removeItem(index)" class="text-red-500 text-center">  <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addItem" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded">+ Ajouter</button>
    </div>

    <!-- Totaux -->
<div class="p-4 rounded-lg">
  <div class="text-right">
    <p>Sous-total : <span class="font-semibold">{{ subtotal }} FCFA</span></p>
    <p>TVA ({{taux}}%) : <span class="font-semibold">{{ tvaAmount }} FCFA</span></p>
    <p class="text-lg font-bold">Total TTC : {{ total }} FCFA</p>
  </div>
</div>
   <!-- Valider l'enregistrement -->
    <div class="flex justify-end gap-4">
      <button @click="" class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
      <button @click=""  class="px-4 py-2 bg-blue-600 text-white rounded">
        Enregistrer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {useProformaStore} from '~/stores/proform'
import { onMounted } from 'vue'
definePageMeta({
     layout: 'default' 
})

// Test
const quotes = ref([
])

// Formulaire
const selectedQuote = ref('')
const form = ref({
  deliveryDate: '',
  deliveryAddress: '',
  notes: '',
  items: [{ name: '', qty: 1, price: 0 }]
})

//Afficher les factures proforma 
const proformaStore = useProformaStore()
onMounted(()=>{
  proformaStore.fetchProforma();
})




//Gestion fichier
const fileName = ref('')
const file = ref(null)
const isSubmitting = ref(false)

// calcul des totaux
const subtotal = computed(() => form.value.items.reduce((sum, i) => sum + (i.qty * i.price), 0))
const tvaAmount = computed(() => subtotal.value * taux/100)
const total = computed(() => subtotal.value + tvaAmount.value)
const taux=18
// Préremplissage quand une proforma est sélectionnée
watch(selectedQuote, (newVal) => {
  if (!newVal) {
    // Si aucune proforma sélectionnée, réinitialiser
    form.value.items = [{ name: '', qty: 1, price: 0 }]
    return
  }

  // Trouver la proforma sélectionnée
  const proforma = proformaStore.proforma.find(p => p.id === newVal)

  if (proforma) {
    // Mapper les items reçus depuis l'API vers le format attendu par le formulaire
    form.value.items = proforma.items.map(item => ({
      name: item.product_name,
      qty: item.quantity,
      price: item.unit_price
    }))
  }
})



// Fonctions
const addItem = () => form.value.items.push({ name: '', qty: 1, price: 0 })
const removeItem = (i) => form.value.items.splice(i, 1)

const removeFile = () => { fileName.value = ''; file.value = null }

// const resetForm = () => {
  // selectedQuote.value = ''
//  form.value = { 
// deliveryDate: '', deliveryAddress: '', notes: '', items: [{ name: '', qty: 1, price: 0 }] 
// }
  // fileName.value = ''
// }



</script>
