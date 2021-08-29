<!-- Modification des publications -->

<template>
  <div>
    <Header></Header>
    <main class="main">
      <h1>Modifier</h1>
       <section class="row card">
            <form enctype="multipart/form-data">
                <div class="header p-1">
                    <h1   style="cursor:default">
                        {{ callName() }} vous allez modifier une publication    
                    </h1>
                </div>
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <label for="newMessage">Donnez des détails sur votre publication.</label>

                        <textarea v-on:keydown="isInvalid = false" class="form-control" v-model="newMessage" id="newMessage" name="message" rows="8" placeholder="Saisissez votre message. (1500 caractères max)"></textarea>
                    </div>
                    <div class="col-12 justify-content-center text-center">
                        <img id="imgFile" :src="newImage"  class="w-50 rounded">
                        <p class="text-center"> un aperçu de votre post apparaîtra ici. Formats acceptés: jpg, jpeg, png et gif.</p>
                    </div>
                    <div class="col-12 justify-content-center">
                        <div class="form-group justify-content-center">
                            <label for="File">Choisir une nouvelle photo</label>
                            <input @change="selectFile()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                        </div>
                    </div>
                </div>
                <div class="align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn">Valider</button></div>
                    <router-link to="/messagerie"> <div> <a class="btn">Annuler/Retour</a></div></router-link> 
                </div>
                 <div v-show="isInvalid" class="invalidBox" key="invalid">
                    <p>Vous ne pouvez pas envoyer de post sans contenu (vous devez inclure texte et image). Votre message doit faire moins de 1500 caractères.</p>        
                </div>  
            </form>
        </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
//import
import axios from "axios"
import router from "../router";
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";



export default {
    name: "Modify",
    components: {
      Header,
      Footer
    },
     data() {
        return {
            isAdmin: false,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            file: null,
            messages: [],
            isInvalid: false,

            creation: "",
            messageUserName: "",
            messageUserId: "",
            message: "",
            messageId: "",
            messageUrl: "",

            
        }
    },
    // function du début
    created: function() {  
        let MessageId   = localStorage.getItem('MessageId')
        let self        = this;
        axios.get("http://localhost:3000/api/messages/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.messageUserName    = res.data.userName;
            self.messageUserId      = res.data.userId;
            self.message            = res.data.message;
            this.newMessage = this.message;
            self.messageId          = res.data.id; 
            self.messageUrl         = res.data.messageUrl;
            this.newImage = this.messageUrl;
        })
        .catch((error)=>{
            alert(error)
        })
    },
    methods: {
        //récupération des données de nom
        callName() {
            let name = localStorage.getItem('userName');
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        //sélection d'un fichier image
        selectFile() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },

        //envoi du formulaire pour modification (put)
        send() {
            if (!localStorage.getItem('userName') || !this.newMessage || this.newMessage > 1500 ) {
                    this.isInvalid = true;
            } else {

                const formData = new FormData()

                if(this.file != null) {
                    formData.append("image", this.file)
                }
                
                formData.append("message", this.newMessage.toString())
                formData.append("messageId", this.messageId)

                console.log(formData)

                axios.put("http://localhost:3000/api/messages/", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.UserId = ""
                    this.newMessage = ""
                    this.file = null
                    alert('modification réussie!')
                    console.log("modif effectués")
                    router.push({path : 'messagerie'})
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
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

.card {
    width: 80%;
    padding-bottom: 150px !important;
    margin-left: 10%;
}
</style>