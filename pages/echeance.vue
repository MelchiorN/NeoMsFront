<template>
  <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <div class="border-b pb-4 mb-4">
      <h1 class="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <i class="fas fa-calendar-alt"></i> Détails Échéancier
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-gray-700">
        <div><p><strong>Client :</strong> {{ schedule.client }}</p></div>
        <div><p><strong>Commande :</strong> {{ schedule.order }}</p></div>
        <div><p><strong>Facture :</strong> {{ schedule.invoice }}</p></div>
        <div><p><strong>Total :</strong> {{ schedule.total }} FCFA</p></div>
        <div><p><strong>Payé :</strong> {{ schedule.paid }} FCFA</p></div>
        <div><p><strong>Restant :</strong> {{ remainingAmount }} FCFA</p></div>
        <div><p><strong>Échéances :</strong> {{ schedule.numberOfInstallments }}</p></div>
      </div>
    </div>

    <div class="bg-gray-100 p-4 rounded-lg">
      <p class="text-sm font-semibold text-gray-700 mb-2">
        Progression : {{ progressPercent }}%
      </p>
      <div class="w-full bg-gray-300 rounded-full h-3">
        <div class="bg-indigo-600 h-3 rounded-full" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <table class="w-full border border-gray-300 rounded-lg text-sm mt-4">
      <thead class="bg-indigo-50 text-indigo-700 uppercase text-xs font-semibold">
        <tr>
          <th class="p-3">N°</th>
          <th class="p-3 text-center">Date</th>
          <th class="p-3 text-center">Montant</th>
          <th class="p-3 text-center">Payé</th>
          <th class="p-3 text-center">Reste</th>
          <th class="p-3 text-center">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(installment, index) in schedule.details" :key="index" class="border-t">
          <td class="p-3">{{ index + 1 }}</td>
          <td class="p-3 text-center">{{ formatDate(installment.date) }}</td>
          <td class="p-3 text-center">{{ installment.amount }} FCFA</td>
          <td class="p-3 text-center">{{ installment.paid }} FCFA</td>
          <td class="p-3 text-center">{{ installment.amount - installment.paid }} FCFA</td>
          <td class="p-3 text-center">
            <span :class="getStatusClass(installment)" class="px-2 py-1 rounded-full text-xs">
              {{ getStatusText(installment) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end gap-4 mt-6">
      <button @click="exportPDF" class="px-4 py-2 bg-indigo-600 text-white rounded-lg">
        <i class="fas fa-file-pdf"></i> Export PDF
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'default' })

// Schedule information
const schedule = ref({
  client: 'Client A',
  order: 'CMD-001',
  invoice: 'FAC-001',
  total: 300000,
  paid: 150000,
  numberOfInstallments: 3,
  details: [
    { date: '2025-08-05', amount: 100000, paid: 100000 },
    { date: '2025-09-05', amount: 100000, paid: 50000 },
    { date: '2025-10-05', amount: 100000, paid: 0 }
  ]
})

// Computed property for remaining amount
const remainingAmount = computed(() => schedule.value.total - schedule.value.paid)

// Computed property for progress percentage
const progressPercent = computed(() =>
  Math.round((schedule.value.paid / schedule.value.total) * 100)
)

// Function to format dates
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Function to determine installment status text
const getStatusText = (installment) => {
  if (installment.paid === installment.amount) return 'Payé'
  if (installment.paid > 0 && installment.paid < installment.amount) return 'Partiel'
  
  // Convert date string to Date object for accurate comparison
  const installmentDate = new Date(installment.date);
  const today = new Date();
  
  // Set time to 00:00:00 for accurate day comparison
  installmentDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (installmentDate < today && installment.paid === 0) return 'En retard'
  return 'En attente'
}

// Function to determine installment status class for styling
const getStatusClass = (installment) => {
  const status = getStatusText(installment)
  if (status === 'Payé') return 'bg-green-100 text-green-700'
  if (status === 'Partiel') return 'bg-yellow-100 text-yellow-700'
  if (status === 'En retard') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}

// Action handlers

</script>