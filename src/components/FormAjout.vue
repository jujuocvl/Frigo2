<!-- Un formulaire pour ajouter produit -->
<script setup>
import { reactive } from 'vue';

const emptyList = {
    id: "",
    nom: "",
    qte: ""
};

let data = reactive({
    FormAjout: { ...emptyList },
    ContenuFrigo: []
});
</script>

<template>
<div id="formulaire">
        <form @submit.prevent="$emit('add', nom, qte)">
            <h3>Ajouter un produit au frigo :</h3>
            <br>
            <div>
                <label>Nom du produit à ajouter :</label>
                <br>
                <input id="nom" class="input" name="nom" v-model="data.FormAjout.nom" placeholder="Produit à ajouter..." required/>
            </div>
            <div>
                <label>Quantité du produit à ajouter :</label>
                <br>
                <input id="qte" class="input" name="qte" v-model="data.FormAjout.qte" placeholder="Quantité à ajouter..." min="1" step="1" required/>
            </div>
            <br>
            <button class="boutonSubmit" type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style scoped>
label {
    color: #0570FF;
    font-family: Arial, sans-serif; /* Police de caractères */
    font-size: 14px; /* Taille de la police */
    font-weight: thin;
}
.formulaire {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 1em;
    border-radius: 10px;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
}
#formulaire{
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
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
    color: #ffffff;
    background-color: #0570FF;
    cursor: pointer;
    margin: 0 auto;
}

.boutonSubmit:hover{
    color:#000000; 
}

.input { /*couleur fond textfield prod et qte */
    height: 30px;
    border-radius: 5px;
    background-color:#D1E2EB;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
}

::placeholder { /* couleur typo textfield*/
    color: #000000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    font-weight: thin;
    padding: 0.5em;
}
</style>