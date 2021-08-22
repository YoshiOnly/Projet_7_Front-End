// Fichier js de la messagerie

let message =  {
    name: "",
    content: "",
    imageUrl:""
}


main()

/** Fonction main */
async function main() {
    const articles = await getArticles()
    console.log(articles)

    for (article of articles)
    displayArticle(article)

    installation();
}

/** Récupération des données du serveur */
function getArticles() {
    return fetch("http://localhost:3000/api/messagerie/")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error)
    {
        alert(error)
        alert("Le serveur ne répond pas")
    })
}

/** Affichage des articles 
 * @param {var} article - article du serveur.
 * utilisation d'un template dans la page html
*/
function displayArticle(article) {

    const templateElt = document.getElementById("templateArticle")

    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cardName").textContent = sessionStorage.getItem("name")
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardText").textContent = article.content

    document.getElementById("start").appendChild(cloneElt)
}


function installation(){
    document.getElementById("publier").addEventListener("click", function(){
        getMessage();
        sendMessage(message);
    })
}

function getMessage(){
    // message.name = sesion strorage name
    message.content = document.getElementById("message").value;
    message.imageUrl = document.getElementById("imageUrl").value;
}

function sendMessage(message) {
    return fetch("http://localhost:3000/api/messagerie/publier" ,{
                method: "POST" ,
                headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
                body: JSON.stringify(message)
            })
            .then(function(httpBodyResponse) {
                return httpBodyResponse.json()
            })
            .then(function(message) {
                return message
            })
            .catch(function(error)
            {
                alert(error)
                alert("Le serveur ne répond pas")
            });
}