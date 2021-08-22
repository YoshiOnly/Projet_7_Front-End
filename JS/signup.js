// fichier js d'inscription

// modéle user
let contact =  {
    name: "",
    email: "",
    password: ""
}

//vérification regex
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/;

main()

/** Fonction main */
async function main() {

    installation()
    
    console.log("main iteration")
    //test
}

function getId() {
    contact.name = document.getElementById("name").value
    contact.email = document.getElementById("email").value;
    contact.password = document.getElementById("password").value;
    console.log("getId")
}


function signup(contact){
    return fetch("http://localhost:3000/api/auth/signup" ,{
                method: "POST" ,
                headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
                body: JSON.stringify(contact)
            })
            .then(function(httpBodyResponse) {
                return httpBodyResponse.json()
            })
            .then(function(contact) {
                return contact
            })
            .catch(function(error)
            {
                alert(error)
                alert("Le serveur ne répond pas")
            });
}

async function installation() {
    //button get elementbyid: On click event methode post go to page chat
    document.getElementById("signup").addEventListener("click" ,async function(){
        getId();
        const id = await signup(contact)
        if(id){
            window.location.href = "../index.html";
        }
        //
    })
}