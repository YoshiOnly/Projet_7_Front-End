<template>
    <div>
    <Header></Header>
    <main class="main">
        <h1>Publication</h1>
        <section class="container">
            <router-link to="/messagerie"><bouton class="btn">Retour</button></router-link>
        </section>
        <section class="card " >
                <div class="card-header">
                    <span class="text-bold  p-1" > 
                        Posté par {{ messageUserName }}
                        le {{ creation }}
                    </span>
                    <div class="" style="width: 6rem;">
                        ref # {{ messageId}}
                    </div>                                                                                       
                </div>
                <div class="publication"> 
                        <div>   {{ message }} </div> 
                </div> 
                <div>
                    <p class="text-center"> 
                        <img :src="messageUrl" v-if="messageUrl !== '' " class="border messImage" alt="image postee par utilisateur">
                    </p>                          
                </div> 
                <div >
                    
                    <div v-if="isAdmin || messageUserId == currentUserId">
                        <button @click="deleteMessage(messageId, messageUserId, currentUserId)" class="btn"> Delete </button>
                    </div>
                </div>
            </section> 

            <!-- section commentaire(s) -->
        <section class="row">
            <router-link to='/CreateComment' style="width:100%;"><p  v-if="comments.length == 0" class=' btn'> Aucun commentaire pour l'instant, soyez le premier à en créer un !</p><p  v-else class='btn'> Ajouter un commentaire</p></router-link>
            

            <div v-for="comment in comments" :key="comment" class="card" style="max-width:1000px;">
                <div class="card-header ">
                    <p class="card" >Commentaire rédigé le {{ comment.createdAt.slice(0,10).split('-').reverse().join('/') }}  par {{ comment.User.userName.charAt(0).toUpperCase() + comment.User.userName.slice(1) }}</p>
                </div>
                <div class="card-body">
                    <p>  {{ comment.comment }} </p>
                </div>
                <div class="">
                    <div v-if="isAdmin || comment.UserId == currentUserId">
                        <button @click="deleteComment(comment.id, comment.UserId, currentUserId)" class="btn"> Delete </button>
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
import router from "../router";
import axios from "axios";

export default {
  name: 'Publication',
  components: {
    Header,
    Footer
  },

      data() {
        return {
            isAdmin: false,
            comments: [],
            creation: "",
            messageUserName: "",
            messageUserId: "",
            message: "",
            messageId: "",
            messageUrl: "",
            nameCurrentUser: "",
            currentUserId: "",
            creationUser: ""
        }
    },
    created: function() {  
        

        //let MessageId   = localStorage.getItem('MessageId')

        let MessageId   = this.$route.params.id

        let self        = this;
        axios.get("http://localhost:3000/api/messages/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.messageUserName    = res.data.userName;
            self.messageUserId      = res.data.userId;
            self.message            = res.data.message;
            self.messageId          = res.data.id; 
            self.messageUrl         = res.data.messageUrl;
        })
        .catch((error)=>{
            alert(error)
        })
        let id = localStorage.getItem('userId');
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.isAdmin                = res.data.isAdmin;
            self.nameCurrentUser        = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creationUser           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.currentUserId          = res.data.id
        })
        .catch((error)=> { console.log(error) 
        })  
        axios.get("http://localhost:3000/api/comments/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then( function (res) {
            self.comments = res.data;  
            console.log(self.comments)
        })
        .catch((error) => {console.log(error)
        });
    },
    methods: {

        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMessage(messageId, messageUserId, currentUserId) {
            let confirmMessageDeletion = confirm("voulez-vous vraiment supprimer cette image ?, tous les commentaires associés seront également supprimés.");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/messages/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  messageId,
                        messageUid: messageUserId,
                        uid:        currentUserId
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    console.log("ligne 133 " + error)})
                    alert("Au click sur ok, le message (et ses commentaires) supprimé, retour à l'accueil.")
                    router.push({ path : "/messagerie" });
            } else {
                return
            }

        },
        deleteComment(commId, commUid, currentUid) {

            let confirmCommentDeletion = confirm("voulez-vous vraiment suppimer votre commentaire ?");
            if (confirmCommentDeletion == true) {
                axios.delete("http://localhost:3000/api/comments/", {
                headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        commentId:     commId,
                        commentUid:    commUid,
                        currentUid:    currentUid
                    }
                })
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et le commentaire sera supprimé');
                    location.reload();
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        }
    }
}
</script>

<style scoped>
.row
{
    justify-content: center;
    width: 90%;
    padding-left: 10%;
}

.nocomment {
    width: 100%;
    color: white;
}
.nocomment:hover {
    color: black;
}

a:hover {
    color: black !important;
}

.card {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

</style>