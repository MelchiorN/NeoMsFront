<template>
  <div class="max-w-xl p-6 mx-auto bg-white rounded-lg shadow">
    <h2 class="mb-6 text-2xl font-bold text-center">Ajouter un Client</h2>

    <form >
      <div class="flex items-center gap-5 mb-4">
      <label class="block mb-1 font-semibold">Nom</label>
        <input  type="text" class="w-full px-3 py-2 border border-black rounded-[10px]"placeholder="Nom" required />
      </div>

      <div class="flex items-center gap-5 mb-4">
        <label class="block mb-1 font-semibold">Prénom</label>
        <input  type="text" class="w-full  px-3 py-2 border border-black rounded-[10px]" placeholder="Prénom" required />
      </div>

      <div class="flex items-center gap-5 mb-4">
        <label class="block mb-1 font-semibold">Email</label>
        <input  type="email" class="w-full px-3 py-2 border border-black rounded-[10px]"placeholder="Email" required />
      </div>

      <div class="flex items-center gap-5 mb-4">
        <label class="block mb-1 font-semibold">Téléphone</label>
        <input  type="tel" class="w-full px-3 py-2 border border-black rounded-[10px]"placeholder="Téléphone" required />
      </div>

      <div class="flex items-center gap-5 mb-6">
        <label class="block mb-1 font-semibold">Adresse</label>
        <textarea  class="w-full px-3 py-2 border border-black  rounded-[10px]" placeholder="Adressse" required></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class=" py-2 px-1.5 font-bold text-white bg-blue-700 rounded-[20px] w-64 hover:bg-blue-800">
            Enregistrer
        </button>   
      </div>     
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { ref } from 'vue'

const nom = ref('')
const prenom = ref('')
const email = ref('')
const telephone = ref('')
const adresse = ref('')

function submitClient() {
  console.log({
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    telephone: telephone.value,
    adresse: adresse.value
  })
}
</script>
