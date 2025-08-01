<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
      <i class="fas fa-file-invoice"></i> Enregistrer une Facture Proforma
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Client -->
      <div class="w-72">
        <label for="client" class="block font-medium mb-1">Client</label>
        <select
          id="client"
          v-model="form.clientId"
          required
          class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Sélectionner un client --</option>
          <option v-for="client in clientStore.clients" :key="client.id" :value="client.id">
            {{ client.last_name }} {{ client.first_name }}
          </option>
        </select>
      </div>
      <!-- Articles -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-semibold text-lg">Articles</h3>
          <button
            type="button"
            @click="addItem"
            class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            <i class="fas fa-plus mr-1"></i> Ajouter un article
          </button>
        </div>

        <div v-if="form.items.length === 0" class="py-8 text-center border-2 border-dashed border-gray-300 rounded text-gray-500">
          Aucun article ajouté.
        </div>

        <div v-for="(item, idx) in form.items" :key="idx" class="border p-4 rounded mb-4 bg-gray-50">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <!-- Produit/Service -->
            <div class="md:col-span-2 relative">
            <label class="block text-sm font-medium mb-1">Désignation</label>
            <input type="text" v-model="item.productName" @input="filterArticles(item.productName)" @focus="showSuggestions = true" placeholder="Nom du produit ou article"
              class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"/>

            <!-- Liste des suggestions -->
            <ul v-if="showSuggestions && filteredArticles.length" class="absolute bg-white border border-gray-300 rounded w-full mt-1 shadow-lg z-10">
              <li v-for="article in filteredArticles":key="article.id" @click="selectArticle(article, idx)"class="p-2 hover:bg-indigo-100 cursor-pointer">
                {{ article.label }} - {{ formatCurrency(article.price) }}
              </li>
            </ul>
          </div>
          <!-- Quantité -->
            <div>
              <label class="block text-sm font-medium mb-1">Quantité</label>
              <input type="number" v-model.number="item.quantity" min="1" required class="w-full border border-gray-300 rounded p-2 text-center focus:ring-1 focus:ring-indigo-500"/>
            </div>

            <!-- Prix unitaire HT -->
            <div>
              <label class="block text-sm font-medium mb-1">Prix unitaire </label>
              <input type="number" v-model.number="item.unitPrice" min="3500" required class="w-full border border-gray-300 rounded p-2 text-center focus:ring-1 focus:ring-indigo-500"/>
            </div>

            <!-- Total HT -->
            <div class="flex flex-col items-center">
              <label class="block text-sm font-medium mb-1">Total </label>
              <div class="bg-white border border-gray-300 rounded px-3 py-2 w-full text-center font-semibold">
                {{ formatCurrency(item.quantity * item.unitPrice) }}
              </div>
            </div>
           <!-- Supprimer -->
            <div class="flex justify-center">
              <button type="button"@click="removeItem(idx)" class="text-red-600 hover:text-red-800" title="Supprimer cet article">
                <i class="fas fa-trash text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Totaux -->
      <div v-if="form.items.length > 0" class="bg-gray-100 p-4 rounded text-right space-y-1 font-semibold">
        <div>Total HT : {{ formatCurrency(totalHT) }}</div>
        <div>TVA (18%) : {{ formatCurrency(totalTVA) }}</div>
        <div class="text-indigo-700 text-lg font-bold">Total TTC : {{ formatCurrency(totalTTC) }}</div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4 pt-4 border-t border-gray-300">
        <button type="button"@click="goBack" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
          Annuler
        </button>
        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50" >
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données du formulaire
const form = ref({
  clientId: '',
  notes: '',
  items: [] // { productName, description, quantity, unitPrice }
})

import {useArticleStore} from '~/stores/article'
import {useClientStore} from '~/stores/customer'
import { useProformaStore } from '~/stores/proform'
import {onMounted} from 'vue'


//Affichage des articles(le select)
const articleStore=useArticleStore()
onMounted(()=>{
  articleStore.fetchArticle();

})
//Affichage des clients(le select)
const clientStore=useClientStore()
onMounted(()=>{
  clientStore.fetchClients();
})

const showSuggestions = ref(false)
const filteredArticles = ref([])
const filterArticles = (query) => {
  if (!query) {
    filteredArticles.value = []
    return
  }
  filteredArticles.value = articleStore.articles.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )
}

const selectArticle = (article, idx) => {
  form.value.items[idx].productName = article.label
  form.value.items[idx].unitPrice = article.price
  showSuggestions.value = false
}

const proformaStore = useProformaStore()

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  const response = await proformaStore.addProforma(form.value);
  alert('Proforma créée avec succès ✅');
    form.value = { clientId: '', items: [] }; // reset formulaire 
};







// Calculs totaux
const totalHT = computed(() =>
  form.value.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
)
const totalTVA = computed(() => totalHT.value * 0.18)
const totalTTC = computed(() => totalHT.value + totalTVA.value)

// Ajouter un article
const addItem = () => {
  form.value.items.push({
    productName: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
  })
}

// Supprimer un article
const removeItem = (index) => {
  form.value.items.splice(index, 1)
}

// Formatage monétaire simple
const formatCurrency = (amount) => {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })
}



// Retour à la page client sans enregistrer
const goBack = () => {
  router.push('/proposition')
}
</script>
