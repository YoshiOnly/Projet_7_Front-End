<template>
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="./index.html">
                <img src="../assets/icon-left-font-monochrome-white.svg" width="150"
                    height="100" alt="Site logo">
            </a>
            <ul class="site-navigation nav navbar-nav">
                <li>
                    <router-link v-if="isConnected" to="/messagerie">Fil d'actualité</router-link>
                </li>
                <li>
                    <router-link v-if="isConnected" to="/Compte">Mon compte</router-link>
                </li>
                <li>
                    <router-link v-if="!isConnected" to="/">Connexion</router-link>
                </li>
                <li>
                    <router-link v-if="!isConnected" to="/signup">S'inscrire</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
  name: 'Header',
  data() {
        return{
            isConnected: false,
        }
    },
    created: function() {        
        if (localStorage.getItem('userId') != null){
            this.isConnected = true
        } },
}
</script>
