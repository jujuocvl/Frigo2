<!--rechercher des produits-->
<script setup>
import { reactive } from 'vue';

const ContenuF = {
    id: "",
    nom: "",
    qte: ""
};

let data = reactive({
    formFrigo: { ...ContenuF },
    ContenuF: []
});
</script>

<template>
    <div id="form">
        <form @submit.prevent="$emit('search', nom)">
            <label>Nom du produit recherché :</label>
            <br>
            <input id="input" type="text" v-model="nom" placeholder="Produit recherché..." required/>
            <br>
            <input id="Bouton" type="submit" value="Rechercher" />
        </form>
    </div>
    </template>
    
<style>
label {
    color: #0570FF;
    font-family: Arial, sans-serif; /* Police de caractères */
    font-size: 20px; /* Taille de la police */
    font-weight: thin;
}
#Bouton{
    text-decoration: none;
    background-color: #0570FF;
    color:#ffffff; /*couleur typo bouton*/
    font-weight: bold;
    height: 30px;
    width: 130px;
    border-radius: 5px; /* arrondir les bords */
    margin: 0 auto;
}

#Bouton:hover{
    /*border: solid 2px #D1E2EB;*/
    color:#000000; 
}
#text{
    text-decoration: none;
    padding: 1em;
    border-radius: 10px;
    text-align: center;
}

.input {
    height: 30px;
    border-radius: 5px;
    background-color:#D1E2EB;
}

::placeholder {
    height: 30px;
    background-color: #D1E2EB;
    color: #000000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    font-weight: normal;
    padding: 1em;
    border-radius: 5px;
}

form{
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 1em;
    border-radius: 10px;
    border: solid 2px #0570FF;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
}
#form{
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
}
</style>