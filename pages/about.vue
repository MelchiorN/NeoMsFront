<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <div class="w-full max-w-4xl flex bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- Partie gauche - Illustration -->
      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-600 text-white flex-col justify-center items-center p-8">
        <div class="text-center space-y-4">
          <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 0c-3 0-6 1.5-6 4.5V21h12v-4.5c0-3-3-4.5-6-4.5z" />
          </svg>
          <h1 class="text-4xl font-bold tracking-tight">Neo-MNS</h1>
          <p class="text-blue-100">Gestion immobilière simplifiée</p>
        </div>
      </div>

      <!-- Partie droite - Formulaire -->
      <div class="w-full md:w-1/2 p-8 md:p-10">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-800">Connexion</h2>
          <p class="text-gray-500">Accédez à votre espace personnel</p>
        </div>

        <form class="space-y-6">
          <!-- Champ Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="exemple@email.com" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Champ Mot de passe -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Sélecteur de rôle -->
          <div class="space-y-2">
            <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
            <select 
              id="role" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option disabled selected value="">Sélectionnez votre rôle</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="locataire">Locataire</option>
            </select>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">Se souvenir de moi</label>
            </div>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">Mot de passe oublié ?</a>
          </div>

          <!-- Bouton de soumission -->
          <div>
            <button 
              type="submit" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>