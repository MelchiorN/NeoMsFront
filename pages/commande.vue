<template>
  <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Enregistrer une commande</h2>
    <div class="flex flex-col gap-4">

      <!-- Section Sélection Proforma -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Facture Pro Formas <span class="text-yellow-300">*</span>
        </label>
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

      <!-- Sélection Client Direct -->
      <div v-if="!selectedQuote">
        <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
        <select
          v-model="selectedClient"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Sélectionner un client --</option>
          <option v-for="client in clientStore.clients" :key="client.id" :value="client.id">
            {{ client.last_name }} {{ client.first_name }}
          </option>
        </select>
      </div>
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
            <th class="border px-2 py-1 text-center">Désignation *</th>
            <th class="border px-2 py-1 text-center">Qté *</th>
            <th class="border px-2 py-1 text-center">PU *</th>
            <th class="border px-2 py-1 text-center">Total</th>
            <th class="border px-2 py-1 text-center">Supp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.items" :key="index">
            <td class="border"><input v-model="item.name" class="w-full text-center" /></td>
            <td class="border"><input type="number" v-model.number="item.qty" min="1" class="w-full text-center" /></td>
            <td class="border"><input type="number" v-model.number="item.price" step="1" class="w-full text-center" /></td>
            <td class="border">{{ (item.qty * item.price) }} FCFA</td>
            <td class="border">
              <button @click="removeItem(index)" class="text-red-500">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addItem" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded">+ Ajouter</button>
    </div>

    <!-- Totaux -->
    <div class="p-4 rounded-lg text-right">
      <p>Sous-total : <span class="font-semibold">{{ subtotal }} FCFA</span></p>
      <p>TVA ({{ taux }}%) : <span class="font-semibold">{{ tvaAmount }} FCFA</span></p>
      <p class="text-lg font-bold">Total TTC : {{ total }} FCFA</p>
    </div>

    <!-- Boutons -->
    <div class="flex justify-end gap-4">
      <button class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
      <button @click="submitOrder" :disabled="isSubmitting"
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
        {{ isSubmitting ? 'En cours...' : 'Enregistrer' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useClientStore } from '~/stores/customer'
import { useProformaStore } from '~/stores/proform'
import { useOrderStore } from '~/stores/order'

definePageMeta({ layout: 'default' })

const router = useRouter()
const selectedQuote = ref('')
const selectedClient = ref('')
const form = ref({
  deliveryDate: '',
  deliveryAddress: '',
  notes: '',
  items: [{ name: '', qty: 1, price: 0 }]
})

const proformaStore = useProformaStore()
const clientStore = useClientStore()
const orderStore = useOrderStore()

onMounted(() => {
  proformaStore.fetchProforma()
  clientStore.fetchClients()
})

const fileName = ref('')
const file = ref(null)
const isSubmitting = ref(false)

const taux = 18
const subtotal = computed(() => form.value.items.reduce((sum, i) => sum + (i.qty * i.price), 0))
const tvaAmount = computed(() => subtotal.value * taux / 100)
const total = computed(() => subtotal.value + tvaAmount.value)

watch(selectedQuote, (newVal) => {
  if (!newVal) {
    form.value.items = [{ name: '', qty: 1, price: 0 }]
    return
  }
  const proforma = proformaStore.proforma.find(p => p.id === newVal)
  if (proforma) {
    form.value.items = proforma.items.map(item => ({
      name: item.product_name,
      qty: item.quantity,
      price: item.unit_price
    }))
  }
})

const addItem = () => form.value.items.push({ name: '', qty: 1, price: 0 })
const removeItem = (i) => form.value.items.splice(i, 1)
const removeFile = () => { fileName.value = ''; file.value = null }

const handleFileUpload = (e) => {
  const selectedFile = e.target.files[0]
  if (selectedFile) {
    fileName.value = selectedFile.name
    file.value = selectedFile
  }
}

const submitOrder = async () => {
  console.log('submitOrder déclenché')

  if (!selectedQuote.value && !selectedClient.value) {
    Swal.fire('Erreur', 'Veuillez sélectionner une facture proforma ou un client.', 'error')
    return
  }
  if (form.value.items.length === 0) {
    Swal.fire('Erreur', 'Veuillez ajouter au moins un article.', 'error')
    return
  }

  isSubmitting.value = true

  try {
    let clientIdToSend = null
    let invoiceIdToSend = null

    if (selectedQuote.value) {
      const proforma = proformaStore.proforma.find(p => p.id === selectedQuote.value)
      if (!proforma) {
        Swal.fire('Erreur', 'Facture proforma introuvable.', 'error')
        isSubmitting.value = false
        return
      }
      invoiceIdToSend = selectedQuote.value
      clientIdToSend = proforma.client_id
    } else {
      clientIdToSend = selectedClient.value
      if (!clientIdToSend) {
        Swal.fire('Erreur', 'Veuillez sélectionner un client.', 'error')
        isSubmitting.value = false
        return
      }
    }

    const payload = {
      invoice_id: invoiceIdToSend,
      client_id: clientIdToSend,
      items: form.value.items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      }))
    }

    console.log('Payload envoyé :', payload)

    await orderStore.addOrder(payload)

    Swal.fire({
      icon: 'success',
      title: 'Commande enregistrée avec succès',
      showConfirmButton: false,
      timer: 2000
    })

    router.push('/infocommande')

  } catch (error) {
    Swal.fire('Erreur', 'Une erreur est survenue lors de l’enregistrement.', 'error')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
