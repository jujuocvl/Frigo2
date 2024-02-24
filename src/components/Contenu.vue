<!--Liste des produits du frigo-->
<script setup>
import AffichageProduits from "./AffichageProduits.vue"
import FormAjout from "./FormAjout.vue"
import { onMounted} from "vue";
import Produit from "../Produit.js";
import { reactive } from 'vue';
import { url } from '../urlapi.js';
import Search from "./Search.vue";

//Liste des produits :
const produits = reactive([]);
//Liste pour recherche :
const produitsSearch = reactive([]);

//Fonction qui appelle la méthode AfficheFrigo (cycle de vie)
onMounted(() => {
    AfficheFrigo()
});

//Meth pour requete GET sur API pour récup données BD puis stock dans "produits"
function AfficheFrigo(){
    const fetchOptions = {
        method:"GET"
    };
    fetch(url,fetchOptions)
    .then((response) => {
        return response.json()
    })
    .then((dataJSON) => {
        produits.splice(0,produits.length) // recuperer les produits 1 par 1
        dataJSON.forEach((v)=>produits.push(new Produit(v.id, v.nom, v.qte)))
    })
    .catch((error) => console.log(error));
}
function ajouteProduit() {
    //lié a "FormAjout.vue"
    if (data.FormAjout.nom.length == 0) {
        alert("Veuillez saisir un produit");
    }
    else if (data.FormAjout.qte.length == 0) {
        alert("Veuillez saisir une quantité");
    }
    else if (data.FormAjout.qte <= 0) {
        alert("La quantité doit être positive");
    }
    else {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // POST pour faire un enregistrement
        const fetchOptions = {method:"POST", headers: myHeaders, body: JSON.stringify({nom:data.FormAjout.nom, qte:data.FormAjout.qte})};
        fetch(url,fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
        AfficheFrigo()
    })
    .catch((error) => console.log(error));
    }
}

function supprimerProduit(entityRef) {
    let options = {
        "method": "DELETE"
    };
    fetch(url + "/" + entityRef, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

function augmenterQte(idRef, nomRef, qteRef) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:idRef, nom:nomRef, qte:qteRef+=1 })
    };
    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            //console.log(dataJson);
            console.log(entityRef, titleref, qteRef);
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

function diminuerQte(produit) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:produit.id, nom:produit.nom, qte:produit.qte-=1 })
    };
    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            //console.log(dataJson);
            //si qte nulle on supp le prod
            if (produit.qte <= 0) {
                supprimerProduit(produit.id);
            }
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

function search(nom) {
    const fetchOptions = {method:"GET"};
    fetch(url+`?search=${nom}`,fetchOptions)
    .then((response) => {return response.json()})
    .then((dataJSON) => {
        produitsSearch.splice(0,produitsSearch.length)
        dataJSON.forEach((v)=>produitsSearch.push(new Produit(v.id, v.nom, v.qte)))

        let texteHTML = ""
        for (let p of produitsSearch) {
            texteHTML += `<option>${p.nom} (quantité : ${p.qte})</option>`
        }
        document.getElementById('search').innerHTML = texteHTML
    })
    .catch((error) => console.log(error));
}
</script>

<template>
    <br>
    <div>
        <!--Liste des produits :-->
        <h3>Contenu</h3>
        <div id="listeProd">
            <ul>
                <li v-for="(produit) in produits" :key=[produit.id]>
                <AffichageProduits @eventDown="diminuerQte" @eventUp="augmenterQte" @eventSupp="supprimerProduit" v-bind:produit="produit"/>
                </li>
            </ul>
        </div>

        <!--Ajout d'un produit :-->
        <br>
        <h3>Ajouter un produit</h3>
        <br>
        <br>
        <div id="form">
            <FormAjout @add="ajouteProduit"/>
        </div>
        <br>
        <br>
        <!--Recherche d'un produit : -->
        <h3>Rechercher un produit</h3>
        <br>
        <div id="Recherche">
        <br>
            <Search @search="search"/>
        </div>
        <br>
        <label2>Résultat de la recherche :</label2>
        <div id="select">
            <select id="search">
                <option value="" disabled selected>Résultat de la recherche...</option>
            </select>
        </div>
   
    </div>

</template>

<style scoped>
h3{
    border-radius: 10px;
    background-color:#D1E2EB;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: normal;
    font-size: 2em; /* em relative à la taille de l'ele parent*/
    letter-spacing: 1px;
    color:#0570FF;
    text-align: center;
}
label2 {
    display: flex;
    color: #0570FF;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif; /* Police de caractères */
    font-size: 20px; /* Taille de la police */
    font-weight: bold;
    text-align: center;
}

#listeProd{
    font-size: 2em;
    color:black;
    overflow: hidden;
}

#listeProd ul{
    display: flex;
    flex-wrap: wrap;
}

#listeProd li{
    list-style-type: none;
}

#select{
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
}

#search{
    display: flex;
    color: #000000;
    font-family: 'Courier New', Courier, monospace;
    flex-direction: column;
    width: 400px;
    background-color: #D1E2EB;
    padding: 0.5em;
    border-radius: 10px;
    font-size: 0.9em;
    }
</style>