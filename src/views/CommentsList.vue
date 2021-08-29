<!-- Pade d'administration des commentaires-->

<template>
    <div v-if="isAdmin">   
        <Header></Header> 
        <main class="main justify-content-center">
             <!-- div incluant le titre -->
            <div>
                <h1>Administration des commentaires</h1>
            </div>

            <div><router-link to="/Admin"><button class="btn">Retour</button></router-link></div>

            <section id="filPrincipal" class="row">
                <div class="col-12">
                     <!-- bloc utilisateur -->
                    <article class="card">
                        <div class="card-header">
                            <span>
                                <span> Bonjour {{ nameCurrentUser }} ! </span>
                                <button class="btn" @click="localClear"> SIGNOUT </button>
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="">
                                <div>Membre depuis le :</div>
                                <div>{{ creation }}</div>
                            </div>
                            
                        </div>
                        <div class="card-footer">
                                <p>Pour modérer les commentaires,  vous rendre sur la page des commentaires.</p>
                        </div>

                            
                    </article> 
                </div>   
                 <!-- bloc listes messages  -->
                <div class="col col-md-8" style="margin: auto;">
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
                            <span class=""> <button class=" btn" @click="seeOnePost( i.id )"> Voir le message </button> </span> 
                        </div>
                    </div>
                </div>
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
            router.push({ name: "Publication", params: { id: m} });
        }
    }
}
</script>

<style scoped>


</style>