<script setup>
import { reactive, onMounted } from "vue";
import { url } from '../urlapi.js';

const ContenuF = {
    id: "",
    nom: "",
    qte: ""
};

let data = reactive({
    formulaireFrigo: { ...ContenuF },
    ContenuF: []
});

function AfficheFrigo() {
    let dataOptions = {
        "method": "GET"
    };
    fetch(url, dataOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            //console.log(dataJson);
            data.ContenuF = dataJson;
        })
        .catch((error) => {
            console.log(error);
        })
}

function ajouteProduit() {
    if (data.formulaireFrigo.nom.length == 0) {
        alert("Veuillez saisir un produit");
    }
    else if (data.formulaireFrigo.qte.length == 0) {
        alert("Veuillez saisir une quantité");
    }
    else if (data.formulaireFrigo.qte <= 0) {
        alert("La quantité doit être positive");
    }
    else {
        // Ajouter catégorie avec données formulaire
        const options = {
            method: "POST", // POST pour ajouter un enregistrement
            body: JSON.stringify(data.formulaireFrigo),
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(url + "?sort=id,desc", options)
            .then((response) => {
                return response.json();
            })
            .then((dataJson) => {
                data.ContenuF = dataJson;
                AfficheFrigo();

            })
            .catch((error) => {
                console.log(error);
            })
        data.formulaireFrigo.id = '';
        data.formulaireFrigo.nom = '';
        data.formulaireFrigo.qte = '';
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

function augmenterQte(idProd, nomProd, qteProd) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: idProd, nom: nomProd, qte: qteProd += 1 })
    };
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

function diminuerQte(idProd, nomProd, qteProd) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: idProd, nom: nomProd, qte: qteProd -= 1 })
    };
    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            //console.log(dataJson);
            if (qteProd <= 0) {
                supprimerProduit(idProd);
            }
            AfficheFrigo();
        })
        .catch((error) => {
            console.log(error);
        })
}

onMounted(AfficheFrigo);

</script>

<template>
    <head>
    <link rel="stylesheet" href="/node_modules/@fortawesome/fontawesome-free/css/all.min.css">
</head>

    <div class="formulaire">
        <!-- Un formulaire pour ajouter produit -->
        <form @submit.prevent="ajouteProduit">
            <h3>Ajouter un produit dans le frigo</h3>
            <div>
                <input id="nom" class="input" name="nom" v-model="data.formulaireFrigo.nom" placeholder="Produit à ajouter" />
            </div>
            <div>
                <input id="quantiteEnStock" class="input" name="qteFrigo" v-model="data.formulaireFrigo.qte"
                    placeholder="Quantité à ajouter" />
            </div>
            <button class="boutonSubmit" type="submit">Ajouter</button>
                
        </form>
    </div>

    <div class="tab">
        <table>
            <caption class="titreTab">Dans mon frigo, il y a...</caption>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Action</th>
            </tr>
            <tr v-for="produit in data.ContenuF" :key="produit.id">
                <td>{{ produit.id }}</td>
                <td>{{ produit.nom }}</td>
                <td><button class="boutonModifier"
                        @click="diminuerQte(produit.id, produit.nom, produit.qtestock, produit.Image)">
                        <font-awesome-icon icon="minus" />
                    </button> 
                    {{ produit.qtestock }} 
                    <button class="boutonModifier"
                        @click="augmenterQte(produit.id, produit.nom, produit.qtestock, produit.Image)">
                        <font-awesome-icon icon="plus" />
                    </button>
                </td>
                <td>
                    {{ produit.qte }}
                </td>
                <td>
                    <button class="boutonSupprimer" @click="supprimerProduit(produit.id)">
                        <font-awesome-icon class="trashIcon" icon="trash" />Supprimer
                    </button>
                </td>
            </tr>
        </table>
    </div>

</template>

<style scoped>
.formulaire { /*tentative d'alignement des boutons*/
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 10px;
}
h3 { /* titre "ajouter un prod au frigo"*/
    color: #0570FF;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
.boutonSubmit { /* bouton ajouter pour ajouter prod dans frigo*/
    height: 30px;
    width: 80px;
    border-radius: 5px; /* arrondir les bords */
    color: #D1E2EB;
    background-color: #0570FF;
    cursor: pointer;
}

.input { /*couleur fond textfield prod et qte */
    height: 30px;
    border-radius: 5px;
    background-color:#D1E2EB;
}

::placeholder { /* couleur typo textfield*/
    color: #0570FF;

}
.boutonExport {
    cursor: pointer;
    height: 30px;
    padding-left: 3px;
    padding-right: 10px;
    border-radius: 5px;
    background-color: #3a2885;
}

.boutonSupprimer {
    border-radius: 5px white;
    height: 25px;
    cursor: pointer;
}

.trashIcon {
    padding-right: 5px;
}
.tab {
    margin-left: 5%;
    position: absolute;
    justify-content: center;
}

td,
th {
    border: 0.5px solid #ddd;
    padding: 50px;
    color: #fdfdfd;
    text-align: center;
}

th { /*entete tableau*/
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    background-color: #D1E2EB;
    color: #0570FF;
}

.titreTab { /* titre du tableau*/
    font-size: 20px;
    font-family: 'Tahoma';
    color: #0570FF;
}

</style>