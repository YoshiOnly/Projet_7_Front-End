<!-- User list view -->

<template>
    <div v-if="isAdmin">    
        <Header></Header>
        <main class="col-12 main">
             <!-- div contenant le titre -->
            <div >
               <h1>Administration des users</h1>
            </div>
            <section id="filPrincipal" class="">
                 <!-- bloc utilisateur -->
                <article class="">
                    <div class="card">
                        <div class="card-header">
                            <span>
                                <p > Bonjour {{ nameCurrentUser }} ! </p>
                                <button @click="localClear" class="btn" > SIGNOUT </button>
                            </span>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            <div>
                                <router-link v-if="isAdmin" to='/Admin'><button v-if="isAdmin" type="button"  class=" btn mx-auto rounded p-2">Administration</button></router-link> 
                            </div>
                        </div>
                        <div class="card-body mx-auto">
                            <div>Vous pouvez supprimer les utilisateurs que vous voulez.</div>
                        </div>
                    </div> 
                </article> 
                 <!-- bloc listes utilisateurs -->  
                <div class="bloc-user">
                    <h2 class="text-center">
                        LISTE DE TOUS LES UTILISATEURS
                    </h2>
                    <div class="bloc-ref">
                        <span class="">NOM-</span>  
                        <span class="">EMAIL-</span>
                        <span class="">DEPUIS LE-</span> 
                        <span class="">SUPPRIMER</span> 
                    </div>
                    <div v-for="i in users" :key="i">   
                        <div class="bloc-com row">
                            <span class=""> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class=""> {{ i.email }} </span> 
                            <span class=""> {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            
                        </div>
                        <div class=""> <button class=" btn" @click="deleteOneUser( i.id, isAdmin )"> supprimer </button> </div> 
                    </div>
                </div>
            </section>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
//import (components, axios et router)

import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import axios from "axios";
import router from "../router";


export default {
    name: "UsersList",
    components: {
      Header,
      Footer
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            users: []
        }
    },
    //function is done at the begining of the page
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  

        //get user information for auth
        axios.get("http://localhost:3000/api/users/" + id , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });

        //get all user information for modification
        axios.get("http://localhost:3000/api/users/all" , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {  
            this.users = res.data.found;
        })
        .catch((error)=>{
            console.log(error)
        })      
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {

        // suppression d'un user
        deleteOneUser(uid, isAdmin) {
        console.log(uid, isAdmin)
        
        let confirmUserDeletion = confirm("voulez-vous vraiment supprimer cet utilisateur ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        uid:          uid,
                        isAdmin:      isAdmin,
                    }
                })
                .then((res)=> {
                    console.log(res)
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                    router.replace("http://localhost:8080/api/UsersList")
                })
                .catch((error) => { 
                    location.reload();
                    console.log(error)
                })
            } else {
                return 
            }
        },
        //deconnexion
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        //go to publication
        seeOnePost(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.replace("http://localhost:8080/api/comment")
        }
    }
}
</script>

<style scoped>
.btn {

    border-color: black;
    border-width: 1px;
    border-style: outset;
}

.btn-signout {
    height: 25px;
}
.bloc-ref {
    display: block;
font-size: 20px;
font-weight: bold;
height: 30px;
}
.bloc-com {
    display: block;
font-size: 16px;
height: 30px;
}

.bloc-user {
    display: flex;
flex-direction: column;
}
</style>