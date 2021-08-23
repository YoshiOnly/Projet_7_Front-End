<!-- Pade d'administration du site -->

<template>
    <div>    
        <Header></Header>
        <main v-if="isAdmin">   
             <!-- section incluant le titre --> 
            <section>
                <h1>Administration du site</h1>
            </section>

            <section id="filPrincipal" class="">
                <div class="block-admin">
                     <!-- bloc utilisateur -->
                    <article class="card">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <div class="m-1" style="color: red;"> Bonjour {{ nameCurrentUser }} ! </div>
                                <button @click="localClear"> SIGNOUT </button>
                            </div>
                        </div>

                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>

                            <div>
                                <div v-if="isAdmin">
                                    <router-link to='/Admin'><div v-if="isAdmin" type="button">VOUS ÊTES L'ADMINISTRATEUR DU SITE</div></router-link> 
                                </div>
                            </div>
                        </div>

                        <div class="card-body mx-auto">
                            <div>Vous avez le pouvoir de supprimer les messages des utilisateurs, leurs commentaires, ainsi que les utilisateurs eux-mêmes.</div>
                        </div>
                    </article> 
                </div>   
                 <!-- bloc choix (to comment list ou user list) -->
                <article class="">
                    <h2 class="text-white">FAITES VOTRE CHOIX</h2>
                    <div class="row justify-content-around">
                        <button @click="toCommentsList()" class="btn  rounded shadow font-weight-bold p-5 m-2">MESSAGES/COMMENTS</button>
                        <button @click="toUsersList()" class="btn  rounded shadow font-weight-bold p-5 m-2" >USERS</button>
                    </div>
                </article>
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
    name: "Admin",
    components: {
      Header,
      Footer
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
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
            router.push({path : "/comment"})
        },
        toCommentsList() {
            router.push({path : "/CommentsList"})
        },
        toUsersList() {
            router.push({path : "/UsersList"})
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
}

.btn {
    background-color: white;
}

.block-admin{
    width: 80%;
    margin-left: 10%;
}
</style>