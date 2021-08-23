<!-- Pade d'administration des commentaires-->

<template>
    <div v-if="isAdmin">   
        <Header></Header> 
        <main class="col-12">
             <!-- div incluant le titre -->
            <div>
                <h1>Administration des commentaires</h1>
            </div>
            <section id="filPrincipal" class="">
                <sub class="block-admin">
                     <!-- bloc utilisateur -->
                    <article class="card">
                        <div class="card-header">
                            <span>
                                <span  style="color:red;"> Bonjour {{ nameCurrentUser }} ! </span>
                                <button class="btn-signout" @click="localClear"> SIGNOUT </button>
                            </span>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            <div>
                                <router-link v-if="isAdmin" to='/Admin'><button  type="button" class=" btn  mx-auto rounded p-2 buttonsPanel">ADMIN. </button></router-link> 
                            </div>
                        </div>
                        <div class="card-body mx-auto">
                            <div>Pour modérer les commentaires, veuillez vous rendre sur la page des commentaires.</div>
                        </div>
                    </article> 
                </sub>   
                 <!-- bloc listes messages  -->
                <sub class="col col-md-8">
                    <h2 class="text-center">
                        Liens vers tous les messages et leurs commentaires.
                    </h2>
                    <div class="bloc-ref">
                            <span class="">DATE-</span>  
                            <span class="">AUTEUR-</span>
                            <span class="">MESSAGE-</span> 
                            <span class="">REF-</span> 
                            <span class="">VOIR-</span> 
                    </div>
                    <div v-for="i in messages" :key="i">   
                        <div class="bloc-com">
                            <span class=""> Le {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            <span class=""> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class=""> {{ i.message.slice(0,10) }}...</span> 
                            <span class=""> ref #{{ i.id }}</span> 
                            <span class=""> <button class="btn-signout" @click="seeOnePost( i.id )"> Voir le message </button> </span> 
                        </div>
                    </div>
                </sub>
            </section>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import axios from "axios";
import router from "../router";


export default {
    name: "CommentsList",
    components: {
      Header,
      Footer
    },
    data() {
        return {
            isAdmin: false,
            messages: [],
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            if (res) {
                self.messages = res.data.list;
                console.log(res.data.list)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })      
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        seeOnePost(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.replace("http://localhost:8080/api/comment")
        }
    }
}
</script>

<style scoped>
.card {
    width: 100%;
    margin-top: 1%;
    margin-bottom: 1%;
}

main {
    padding-bottom: 2%;
    background-color: red;
    color: white;
    text-align: center;
    min-height: 700px;
}

.btn {
    background-color: white;
    border-color: black;
    border-width: 1px;
    border-style: outset;
}

.block-admin{
    width: 80%;
    margin-left: 10%;
}

.card-header {
    height: 30px;
    font-size: 20px;
    padding: 0;
    text-align: center;
}

.btn-signout {
    height: 25px;
}
.bloc-ref {
font-size: 20px;
font-weight: bold;
height: 30px;
}
.bloc-com {
font-size: 16px;
height: 30px;
}
</style>