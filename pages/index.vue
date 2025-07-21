<template>
  <div class="min-h-screen flex items-center justify-center bg-[#93C5FD]">
    <div class="flex w-full max-w-4xl min-h-[250px] overflow-hidden bg-white rounded-lg shadow-xl">
      <div class="hidden md:flex md:w-1/2 bg-[#000080] text-white flex-col justify-center items-center p-8">
        <div class="space-y-4 text-center">
          
          <h1 class="text-4xl font-bold tracking-tight">Neo-MNS</h1>
        </div>
      </div>
      <!--Formulaire -->
      <div class="w-full p-8 md:w-1/2 md:p-10">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-center text-gray-800">Connexion</h2>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label for="email"></label>
            <input id="email" v-model="email" type="email"placeholder="Email" class="w-full px-4 py-3 border border-blue-900 rounded-[10px] focus:outline-none focus:ring-blue-400 focus:ring-2 transition"required />
          </div>
          <div class="space-y-2">
            <label for="password"></label>
            <input id="password" type="password"  v-model="password" placeholder="Mot de passe" class="w-full px-4 py-3 border border-blue-900 rounded-[10px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
          </div>
          <div class="flex-col items-center ">
            <div class="flex justify-center">
              <input id="remember" type="checkbox" v-model="remember" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
              <label for="remember" class="block ml-2 text-sm text-gray-700">Se souvenir de moi</label>
            </div><br>
            <div class="flex justify-center">
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">Mot de passe oublié ?</a>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="w-80 text-center bg-[#000080] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()

const handleLogin = async () => {
  try {
    await $fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    })
    const response = await $fetch('http://localhost:8000/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value, // Pour Laravel Sanctum
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        email: email.value,
        password: password.value,
      }
    })
    router.push('/accueil') 
  } catch (error) {
    console.error(' Erreur login', error)
    alert('Erreur de connexion')
  }
}
</script>
