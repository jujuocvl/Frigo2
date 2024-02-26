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
#Bouton{
    text-decoration: none;
    background-color: #0570FF;
    border-radius: 5px;
    color:#ffffff; /*couleur typo bouton*/
    font-family: Arial, sans-serif;
    font-weight: bold;
    height: 30px;
    width: 130px;
    margin: 0 auto;
}

#Bouton:hover{
    color:#000000; 
}
#text{
    text-decoration: none;
    background-color: #d6eefc;
    padding: 1em;
    border-radius: 5px;
    text-align: center;
    }

form{ /* position et contour de la bordure*/
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 1em;
    border-radius: 10px;
    border: solid 2px #0570FF;
    background-color:#e7ecf0;
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
label {
    color: #0570FF;
    font-family: Arial, sans-serif; /* Police de caractères */
    font-size: 20px; /* Taille de la police */
    font-weight: thin;
}
input {
    height: 30px;
    border-radius: 5px;
    background-color:#D1E2EB;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
}
::placeholder {
    height: 30px;
    color: #000000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    font-weight: normal;
    border-radius: 5px;
    padding: 0.5em;
}

</style>