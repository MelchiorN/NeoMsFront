
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 p-4 text-white bg-blue-900 rounded-lg">
      <nav class="space-y-4">
        <NuxtLink to="/accueil" class="block m-4 py-2 text-center hover:text-gray-300 hover:bg-gray-400 rounded-[14px] text-medium transition":class="{ 'bg-blue-500 font-bold transition' : $route.path.startsWith('/accueil') }"><i class="fas fa-home"></i> Accueil</NuxtLink>
        <NuxtLink to="/client" class="block m-4 py-2 rounded-[14px] text-center hover:text-gray-300 text-medium hover:bg-gray-400 transition":class="{'bg-blue-500 font-bold transition' : $route.path.startsWith('/client')}"><i class="fas fa-add"></i>  Ajouter un client</NuxtLink>
         <NuxtLink to="/commande" class="block m-4 py-2 rounded-[14px] text-center hover:text-gray-300 text-medium hover:bg-gray-400"  :class="{'bg-blue-500 font-bold': $route.path.startsWith('/commande')}"><i class="fas fa-box"></i> Commande</NuxtLink>
        <!-- Menu déroulant pour "Créer une facture" -->
        <div class="relative group">
          <NuxtLink to="/facture" class="block m-4 py-2 rounded-[14px] text-center hover:text-gray-300 text-medium hover:bg-gray-400 flex items-center justify-center" 
                   :class="{'bg-blue-500 font-bold': $route.path.startsWith('/facture')}">
            <i class="mr-2 fas fa-add"></i> Créer une facture

          </NuxtLink>
          
          <!-- Sous-menu -->
          <div class="absolute left-0 right-0 z-10 invisible w-56 ml-4 transition-all duration-300 bg-blue-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible">
            <NuxtLink to="/facture/rt" class="block px-4 py-2 rounded-t-lg hover:bg-blue-700" :class="{'bg-blue-600': $route.path === '/facture/rt'}">
              <i class="mr-2 fas fa-file-alt"></i> Facture RT
            </NuxtLink>
            <NuxtLink to="/facture/hj" class="block px-4 py-2 rounded-b-lg hover:bg-blue-700" :class="{'bg-blue-600': $route.path === '/facture/hj'}">
              <i class="mr-2 fas fa-file-alt"></i> Facture HJ
            </NuxtLink>
          </div>
        </div>
         <NuxtLink to="/facture" class="block m-4 py-2 rounded-[14px] text-center hover:text-gray-300 text-medium hover:bg-gray-400" :class="{'bg-blue-500 font-bold' :$route.path.startsWith('/liste')}"><i class="mr-2 fas fa-list"></i> Liste de facture</NuxtLink>
        

      </nav>
    </aside>

    
    <div class="flex-1 p-6 bg-gray-100">
      <slot />
    </div>
  </div>
</template>
