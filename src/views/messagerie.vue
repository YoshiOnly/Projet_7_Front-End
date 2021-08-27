
<template>
    <div>
    <Header></Header>
    <main class="main">
        <h1>Messagerie</h1>
        <section class="container">

            <!-- bloc utilisateur -->
                <article class="">
                    <div class="card my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1" > Bonjour {{ name }} ! </p>
                                <button class="btn" @click="localClear"> Se deconnecter </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <p id="membre">Membre depuis le {{ creation }}</p>
                            </div>
                            <div id="compteButton" class="text-center">
                                <router-link v-if="isAdmin" to='/Admin'><button type="button" class=" btn">ADMINISTRATION</button></router-link> 
                                <router-link v-else to='/Compte'><button type="button" class=" btn border-0">COMPTE</button></router-link> 
                            </div>
                        </div>
                    </div>                  
                </article>

            <h2 v-if= 'this.messages.length !== 0' > Dernières Publications :</h2>   
            <h2  v-else class='col-12 my-2 btn  btn-block btn-danger font-weight-bold'> Aucune publication pour l'instant. :( </h2>

            <router-link to='/Create' ><button type="button" class="btn">PUBLIER</button></router-link>

            <div id="start"></div>

            
    <!-- bloc publications -->
            <template id="templateArticle">
                <div class="row">
                    <div v-for="message in messages" :key="message.id" class="card">
                        <div>
                            <span>
                                Posté par {{ message.userName.charAt(0).toUpperCase() + message.userName.slice(1) }}
                                le {{ message.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + message.createdAt.slice(11,16) }}
                            </span>                                                                              
                        </div>

                        <div class="publication">
                            {{message.message}}
                        </div>

                        <div  @click="commentPage(message.id)">
                            <img :src="message.messageUrl" v-if="message.messageUrl !== '' " class="border messImage" alt="image postée par un utilisateur" />
                        </div>

                        

                        <div class="row card-footer justify-content-around">
                            <button @click="commentPage(message.id)" class="btn"> Commenter </button>
                            <div v-if="isAdmin || message.UserId == id">
                                <button @click="deleteMessage(message.id, message.UserId, id)" class="btn"> Supprimer </button>
                            </div>
                            <div v-if="isAdmin || message.UserId == id">
                                <button  @click="modifyPage(message.id)" class=" btn" > Modifier </button>
                            </div>
                        </div>                             
                    </div>                        
                </div>
            </template>
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
  name: 'Messagerie',
  components: {
    Header,
    Footer
  },
  data() {
        return {
            isAdmin: false,
            messages: [],
            id: "",                 
            name: "",               
            creation: ""           
        }
    },
    created: function() {       
        if(localStorage.getItem("userId") == null){
            router.push({path : "/"})
        } 
        let id = localStorage.getItem('userId')

        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            if (res) {
                const rep = res.data.list;
                this.messages = rep; 
                rep.splice(10,);
                localStorage.setItem("MessageId", rep[0].id);
                console.log(this.messages)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })   
        let self = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            self.id                 = res.data.id;
            self.name               = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        commentPage(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.push({ path : "/Comment" });
        },
        modifyPage(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.push({ path : "/Modify" });
        },
        deleteMessage(a, b, c) {
            console.log(
                typeof a,
                typeof b,
                typeof c
            )
            let confirmMessageDeletion = confirm("voulez-vous vraiment supprimer cette image ?, tous les commentaires associés seront également supprimés.");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/messages/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  a,
                        messageUid: b,
                        uid:        c
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    location.reload();
                    console.log("ligne 133 " + error)})
            } else {
                return
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
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
}

.btn {
    border-color: black;
    border-width: 1px;
    border-style: outset;
}
</style>