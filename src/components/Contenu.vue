<!--Liste des produits du frigo-->
<script setup>
import AffichageProduits from "./AffichageProduits.vue"
import FormAjout from "./FormAjout.vue"
import { onMounted } from "vue";
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
function AfficheFrigo() {
    const options = {
        method: "GET"
    };
    fetch(url, options)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            produits.splice(0, produits.length) // recuperer les produits 1 par 1
            for (let p of dataJSON) {
                produits.push(new Produit(p.id, p.nom, p.qte, p.photo))
            }
        })
        .catch((error) => console.log(error));
}

function supprimerProduit(id) {
    const index = produits.findIndex(p=> p.id === id);
    let options = {
        "method": "DELETE"
    };
    fetch(url + "/" + id, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            produits.splice(index,1);
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

function augmenterQte(produit) {
    produit.setQte(1);
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: produit.id, nom: produit.nom, qte: produit.qte, photo: produit.photo })
    };
    //console.log(JSON.stringify({ id: produit.id, nom: produit.nom, qte: produit.qte, photo: produit.photo }));
    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            //console.log(dataJson);
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

function diminuerQte(produit) {
    produit.setQte(-1);
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: produit.id, nom: produit.nom, qte: produit.qte, photo: produit.photo })
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

function ajouteProduit(nom, qte, photo) {
    const listeVide = {
        nom: nom,
        qte: qte,
        photo: photo
    }
    //lié a "FormAjout.vue"

    const options = {
        method: "POST", // post pour ajout enregistrement
        body: JSON.stringify(listeVide),
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(url, options)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            AfficheFrigo()
        })
        .catch((error) => {console.log(error); 
});
};

function search(nom) {
    const options = {
        method: "GET"
    };
    fetch(url + `?search=${nom}`, options)
        .then((response) => { return response.json() })
        .then((dataJSON) => {
            produitsSearch.splice(0, produitsSearch.length)
            dataJSON.forEach((v) => produitsSearch.push(new Produit(v.id, v.nom, v.qte)))

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
                    <AffichageProduits @eventDown="diminuerQte" @eventUp="augmenterQte" @eventSupp="supprimerProduit"
                        v-bind:produit="produit" />
                </li>
            </ul>
        </div>

        <!--Ajout d'un produit :-->
        <br>
        <h3>Ajouter un produit</h3>
        <br>
        <br>
        <br>
        <div id="form">
            <FormAjout @add="ajouteProduit" />
        </div>
        <br>
        <br>
        <br>
        <!--Recherche d'un produit : -->
        <h3>Rechercher un produit</h3>
        <div id="Recherche">
            <Search @search="search" />
        </div>

        <label>Résultat de la recherche :</label>
        <div id="select">
            <select id="search">
                <option value="" disabled selected>Résultat de la recherche...</option>
            </select>
        </div>

    </div>
</template>

<style scoped>
h3 {
    background-color: #D1E2EB;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: normal;
    font-size: 2em;
    /* em relative à la taille de l'ele parent*/
    letter-spacing: 1px;
    color: #0570FF;
    text-align: center;
}

label {
    display: flex;
    color: #0570FF;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    /* Police de caractères */
    font-size: 20px;
    /* Taille de la police */
    font-weight: bold;
    text-align: center;
}

#listeProd {
    font-size: 2em;
    color: black;
    overflow: hidden;
}

#listeProd ul {
    display: flex;
    flex-wrap: wrap;
}

#listeProd li {
    list-style-type: none;
}

#select {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
}

#search {
    display: flex;
    color: #000000;
    font-family: 'Courier New', Courier, monospace;
    flex-direction: column;
    width: 400px;
    background-color: #D1E2EB;
    padding: 0.5em;
    border-radius: 10px;
    font-size: 0.75em;
}</style>