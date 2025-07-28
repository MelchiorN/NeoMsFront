<template>
  <div class="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <!-- Titre -->
    <div class="flex justify-between items-center border-b pb-4">
      <h1 class="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <i class="fas fa-calendar-alt"></i> Détails Échéancier
      </h1>
      <button
        class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2"
        @click="goBack"
      >
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>

    <!-- Informations générales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-indigo-50 p-4 rounded-lg text-gray-800">
      <div>
        <p class="font-semibold text-gray-600">Client :</p>
        <p>{{ echeancier.client }}</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Commande :</p>
        <p>#{{ echeancier.commande }}</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Facture :</p>
        <p>#{{ echeancier.facture }} ({{ echeancier.typeFacture }})</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Montant Total :</p>
        <p class="font-bold text-indigo-700">{{ echeancier.total.toLocaleString() }} FCFA</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Payé :</p>
        <p class="text-green-600 font-bold">{{ echeancier.paye.toLocaleString() }} FCFA</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Restant :</p>
        <p class="text-red-600 font-bold">
          {{ (echeancier.total - echeancier.paye).toLocaleString() }} FCFA
        </p>
      </div>
    </div>

    <!-- Progression -->
    <div class="bg-gray-100 p-4 rounded-lg">
      <p class="text-sm font-semibold text-gray-700 mb-2">
        Progression : {{ progressPercent }}%
      </p>
      <div class="w-full bg-gray-300 rounded-full h-3">
        <div
          :class="progressColor"
          class="h-3 rounded-full transition-all duration-500"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </div>

    <!-- Tableau des échéances -->
    <div>
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Détails des échéances</h2>
      <table class="w-full border border-gray-300 rounded-lg text-sm">
        <thead class="bg-indigo-100 text-indigo-700 uppercase text-xs font-semibold">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3 text-center">Date</th>
            <th class="p-3 text-center">Montant</th>
            <th class="p-3 text-center">Payé</th>
            <th class="p-3 text-center">Reste</th>
            <th class="p-3 text-center">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(eche, index) in echeancier.details"
            :key="index"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3 text-center">{{ eche.date }}</td>
            <td class="p-3 text-center">{{ eche.montant.toLocaleString() }} FCFA</td>
            <td class="p-3 text-center">{{ eche.paye.toLocaleString() }} FCFA</td>
            <td class="p-3 text-center">{{ (eche.montant - eche.paye).toLocaleString() }} FCFA</td>
            <td class="p-3 text-center">
              <span :class="getStatusClass(eche)" class="px-3 py-1 rounded-full text-xs font-semibold">
                {{ getStatusText(eche) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 mt-6 border-t pt-4">
      <button
        @click="addPayment"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        <i class="fas fa-plus"></i> Ajouter un paiement
      </button>
      <button
        @click="exportPDF"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <i class="fas fa-file-pdf"></i> Exporter PDF
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
import { ref, computed } from 'vue'

// Détails échéancier
const echeancier = ref({
  client: 'Client A',
  commande: 'CMD-001',
  facture: 'FAC-001',
  typeFacture: 'Définitive',
  total: 300000,
  paye: 150000,
  details: [
    { date: '05/08/2025', montant: 100000, paye: 100000 },
    { date: '05/09/2025', montant: 100000, paye: 50000 },
    { date: '05/10/2025', montant: 100000, paye: 0 }
  ]
})

// Progression
const progressPercent = computed(() =>
  Math.round((echeancier.value.paye / echeancier.value.total) * 100)
)

// Couleur dynamique progression
const progressColor = computed(() => {
  if (progressPercent.value === 100) return 'bg-green-600'
  if (progressPercent.value >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
})

// Statuts
const getStatusText = (e) => {
  if (e.paye === e.montant) return 'Payé'
  if (e.paye > 0 && e.paye < e.montant) return 'Partiel'
  if (new Date(e.date) < new Date() && e.paye === 0) return 'En retard'
  return 'En attente'
}

const getStatusClass = (e) => {
  const status = getStatusText(e)
  if (status === 'Payé') return 'bg-green-100 text-green-700'
  if (status === 'Partiel') return 'bg-yellow-100 text-yellow-700'
  if (status === 'En retard') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}

// Actions
const goBack = () => alert('Retour à la liste')
const addPayment = () => alert('Ajout paiement')
const exportPDF = () => alert('Export PDF avec Laravel DomPDF')
</script>
