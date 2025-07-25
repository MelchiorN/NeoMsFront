<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Propositions </h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="w-[300px] ">
        <div class="w-[300px]">
          <label for="clientId" class="block text-sm font-medium text-gray-700 mb-1">Client </label>
          <select id="clientId" v-model="form.clientId" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Sélectionner un client</option>
          </select>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-md font-medium text-gray-900">Articles du devis</h4>
          <button type="button"  @click="addItem" class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
            <i class="fas fa-add"> </i> <span>Ajouter un article</span>
          </button>
        </div>
        <div class="space-y-3">
          <div  v-for="(item, index) in form.items"  :key="index" class="border border-gray-200 rounded-lg p-4" >
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">Produit/Service</label>
                <input  v-model="item.productName" type="text" required  placeholder="Nom du produit/service" class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500" />       
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Quantité </label>
                <input
                  v-model.number="item.quantity" type="number" min="1"  required class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500" />
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Prix unitaire HT </label>
                <input type="number" min="0" required class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500" />
              </div>

              <div class="flex items-end">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Total HT</label>
                  <div class="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-sm font-medium">
                    {{ formatCurrency(item.quantity * item.unitPrice) }}
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeItem(index)" class="ml-2 p-1 text-red-600 hover:text-red-800"
                  title="Supprimer cet article"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="item.description"
                rows="2"
                placeholder="Description détaillée du produit/service"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
          </div>

          <div v-if="form.items.length === 0" class="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-500">Aucun article ajouté</p>
            <button
              type="button"
              @click="addItem"
              class="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Ajouter le premier article
            </button>
          </div>
        </div>

        <div v-if="form.items.length > 0" class="mt-4 bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Total HT:</span>
              <span class="font-medium ml-2">{{ formatCurrency(totalHT) }}</span>
            </div>
            <div>
              <span class="text-gray-600">TVA (20%):</span>
              <span class="font-medium ml-2">{{ formatCurrency(totalTVA) }}</span>
            </div>
            <div>
              <span class="text-gray-700 font-medium">Total TTC:</span>
              <span class="font-bold ml-2 text-green-600">{{ formatCurrency(totalTTC) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="3"
          placeholder="Notes internes ou informations complémentaires"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
      </div>
      <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('cancel')" class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="form.items.length === 0" class="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ mode === 'create' ? 'Créer le devis' : 'Modifier le devis' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:'default'
})
import { ref, computed, watch, defineProps, defineEmits, withDefaults } from 'vue';

// --- 1. Define Types ---
// These interfaces describe the structure of our data. Helps prevent errors!

interface Client {
  id: number;
  name: string;
  company: string;
}

interface QuoteItemForm {
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface QuoteFormData { // The data we'll send out when the form is submitted
  clientId: number;
  validity: string;
  notes?: string;
  items: QuoteItemForm[];
}

interface Quote { // The full quote object (if we're editing)
  id: number;
  clientId: number;
  validity: string;
  notes: string;
  items: QuoteItemForm[]; // Reusing QuoteItemForm here for simplicity
  status: 'draft' | 'sent' | 'accepted' | 'rejected'; // Example status
  createdAt: string;
}

// --- 2. Define Props ---
// What data does this component receive from its parent?
interface Props {
  quote?: Quote | null; // Optional: The quote object if we're editing
  mode?: 'create' | 'edit'; // Mode of the form (create or edit)
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create', // Default mode is 'create'
});

// --- 3. Define Emits ---
// What events can this component send back to its parent?
const emit = defineEmits<{
  submit: [data: QuoteFormData]; // When the form is submitted, send QuoteFormData
  cancel: []; // When cancel button is clicked
}>();

// --- 4. Sample Data (instead of useSalesStore for simplicity) ---
// In a real app, this would come from a store (like Pinia) or an API.
const clients = ref<Client[]>([
  { id: 1, name: 'Jean Dupont', company: 'Dupont & Fils' },
  { id: 2, name: 'Marie Curie', company: 'InnovTech' },
  { id: 3, name: 'Pierre Martin', company: 'Global Solutions' },
]);

// --- 5. Form State ---
// 'ref' makes this object reactive, so changes update the UI.
const form = ref<{
  clientId: number | ''; // Can be number (selected client ID) or empty string
  validity: string;
  notes: string;
  items: QuoteItemForm[];
}>({
  clientId: '',
  validity: '',
  notes: '',
  items: [],
});

// --- 6. Computed Properties ---
// Values that are calculated automatically based on other reactive data.

const tomorrow = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Set to tomorrow's date
  return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
});

const totalHT = computed(() => {
  // Sum of (quantity * unitPrice) for all items
  return form.value.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
});

const totalTVA = computed(() => {
  return totalHT.value * 0.20; // Assuming 20% VAT
});

const totalTTC = computed(() => {
  return totalHT.value + totalTVA.value;
});

// --- 7. Functions for Form Management ---

// Resets the form to its initial empty state
const resetForm = () => {
  form.value = {
    clientId: '',
    validity: '',
    notes: '',
    items: [],
  };
};

// 'watch' observes changes in 'props.quote'.
// When 'props.quote' changes (e.g., parent passes a different quote for editing),
// this function updates the 'form' state.
watch(
  () => props.quote, // What to watch
  (newQuote) => { // Function to run when it changes
    if (newQuote) {
      // If a quote is provided (edit mode), fill the form with its data
      form.value = {
        clientId: newQuote.clientId,
        validity: newQuote.validity,
        notes: newQuote.notes || '', // Handle optional notes
        items: newQuote.items.map(item => ({
          // Copy each item's properties
          productName: item.productName,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      };
    } else {
      // If no quote (create mode or cleared), reset the form
      resetForm();
    }
  },
  { immediate: true } // Run this watch immediately when the component is first loaded
);

// Adds a new empty item row to the form
const addItem = () => {
  form.value.items.push({
    productName: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
  });
};

// Removes an item from the form based on its index
const removeItem = (index: number) => {
  form.value.items.splice(index, 1); // 'splice' removes elements from an array
};

// Handles what happens when the form is submitted
const handleSubmit = () => {
  // Basic validation: ensure a client is selected and at least one item is added
  if (form.value.clientId === '' || form.value.items.length === 0) {
    alert('Veuillez sélectionner un client et ajouter au moins un article.'); // Simple alert for user
    return;
  }

  // Prepare the data to be sent back to the parent
  const formData: QuoteFormData = {
    clientId: form.value.clientId as number, // Cast to number because it could be ''
    validity: form.value.validity,
    notes: form.value.notes || undefined, // Send undefined if notes are empty
    items: form.value.items,
  };

  emit('submit', formData); // Emit the 'submit' event with the prepared data
};

// --- 8. Utility Function ---
// Formats a number as currency (Euro in French locale)
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
</script>