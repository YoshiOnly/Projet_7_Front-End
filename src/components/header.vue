<template>
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="./index.html">
                <img src="../assets/icon-left-font.png" width="150"
                    height="100" alt="Site logo">
            </a>
            <ul class="site-navigation nav navbar-nav">
                <li>
                    <router-link to="/messagerie">Mon compte</router-link>
                </li>
                <li>
                    <router-link to="/">Connexion</router-link>
                </li>
                <li>
                    <router-link to="/signup">S'inscrire</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
