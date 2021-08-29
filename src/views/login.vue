<!-- Connexion/Log in -->

<template>
    <div>
    <Header> </Header>
    <main class="main">
        <h1>Bienvenue !</h1>
        <section class="container">
            <h2>Identifiants</h2>
            <form @submit.prevent="handleSubmit">
            <div class="row">
                <div id="start" class="col">
                    <div><label class="label" for="email">Adresse mail:</label></div>
                    <div><input v-on:keydown="isInvalid = false" v-model="inputEmail" id="email" type="text" name="email" placeholder="votre email"></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div><label class="label" for="password">Mot de passe:</label></div>
                    <div><input v-on:keydown="isInvalid = false" v-model="inputPassword" id="password" type="password" name="password" placeholder="votre mot de passe"></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="submit" class='font-weight-bold bouton btn' id="connexion">Se connecter</button>
                </div>
            </div>
            
        <div class=' col-7 mx-auto mt-3'>
            
        </div>
            <div v-show="isInvalid">
            Veuillez vérifier vos informations de connexion.
            <router-link to="/signup"><button  class='font-weight-bold bouton btn'>INSCRIPTION?</button></router-link>
            </div>  
            </form>
        </section>
    </main>
    <Footer> </Footer>
    </div>
</template>


<script>
//imort
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import router from "../router";
import axios from "axios";

export default {
  name: 'Login',
  components: {
    Header,
    Footer
  },
  data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    //redirection si connecté
    created: function() {        
        if (localStorage.getItem('userId') != null){
            router.push({path : "/messagerie"})
        } },

    methods: {
        // envoie du formulaire pour connexion et redirection
        handleSubmit() {
            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }
            axios.post("http://localhost:3000/api/auth/login", { 
                email :     this.inputEmail,
                password:   this.inputPassword
             })
            .then(function (res) {
                localStorage.setItem("token",   res.data.token)
                localStorage.setItem("userId",  res.data.userId)
                localStorage.setItem("userName",res.data.userName)
                localStorage.setItem("role",    res.data.role)
                window.alert('connexion réussie, redirection vers la page principale');
                router.push({ path : '/messagerie'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }

  //login request
}
</script>

<style scoped>

</style>