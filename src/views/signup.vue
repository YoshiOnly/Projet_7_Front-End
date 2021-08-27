
<template>
    <div>
    <Header></Header>
    <main class="main">
        <h1>Inscription</h1>
        <section class="container">
            <h2>Identifiants</h2>
            <form @submit.prevent="sendForm(event)">
            <div class="row">
                <div id="start" class="col">
                    <div><label class="label" for="name">Nom</label></div>
                    <div><input v-on:keydown="invalid = false" v-model="inputUserName" id="name" type="text" name="name" value=""></div>
                </div>
            </div>
            <div class="row">
                <div id="start" class="col">
                    <div><label class="label" for="email">Adresse mail:</label></div>
                    <div><input  v-on:keydown="invalid = false" v-model="inputEmail" id="email" type="text" name="email" value=""></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div><label class="label" for="password">Mot de passe:</label></div>
                    <div><input  v-on:keydown="invalid = false" v-model="inputPassword" id="password" type="password" name="password" value=""></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button id="signup" class="bouton btn">S'inscrire</button>
                </div>
            </div>
            </form>
            <div v-show="invalid" class="invalidBox m-2" key="invalid">
                Veuillez remplir tous les champs du formulaire en suivant les instructions.
                </div>  
        </section>
        
    </main>

    <Footer></Footer>
    </div>
</template>


<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import router from "../router";
import axios from "axios";

export default {
  name: 'Signup',
  components: {
    Header,
    Footer
  },

      data() {
        return {
            inputUserName: "",
            inputEmail: "",
            inputPassword: "",
            invalid: false
        }
    },
    created: function() {        
        if (localStorage.getItem('userId') != null){
            router.push({path : "/messagerie"})
        } },
    methods: {
        sendForm() {

            if ( !this.inputUserName || !this.inputEmail || !this.inputPassword ) {
                return this.invalid = true;
            }

            const nameRegex = /(.*[a-z]){3,30}/;
            const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const pwdRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  

            if ( nameRegex.test(this.inputUserName) && mailRegex.test(this.inputEmail) && pwdRegex.test(this.inputPassword)) {
                axios.post("http://localhost:3000/api/auth/signup", { 
                    userName    : this.inputUserName, 
                    email       : this.inputEmail,
                    password    : this.inputPassword
                })
                .then(() => {
                    alert('inscription réussie, redirection vers le module de connexion');
                    router.push({ path : '/'});
                })
                .catch((error)=>{
                    alert(error.status)
                    console.log(error)});
            } else {
                console.log('validation form, method sendForm, renvoie une erreur')
                this.invalid = true;
            }
        }
    }
}


</script>

<style scoped>
.bouton {
    margin: 10px;
    font-weight: bold;
}
</style>