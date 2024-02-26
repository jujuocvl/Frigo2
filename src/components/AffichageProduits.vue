<!--Affichage des produits de la liste-->
<script setup>
const {produit} = defineProps(["produit"]);
</script>

<template>
   <div id="produit">
    <div id="nomProd">{{produit.afficherNom()}}</div>
    <img :src="produit.photo" alt="Image"/> 
    <!-- alt = texte alternatif si l'image ne peut être affichée-->
    <br>
    <div id="qteProd">{{produit.afficherQte()}}</div>
    <button id="moins" @click="$emit('eventDown', produit)">-</button>
    <!-- <span class="espacementCaracteres">````</span> -->
    <button id="plus" @click="$emit('eventUp', produit)">+</button>
    <br>
    <button id="supp" @click="$emit('eventSupp', produit.id)">Supprimer</button>
</div>

</template>

<style>
img{
    width: 120px;
    height: 100px;
}
#moins:hover{
    width: 20px;
    background-color: rgb(245, 136, 136);
    border-radius: 5px;
}

#plus:hover{
    width: 20px;
    background-color: rgb(170, 188, 129);
    border-radius: 5px;
}

.supp {
    height: 40px;
    cursor: pointer;
}

#supp:hover{
    background-color: #0570FF;
    border-radius: 5px;
    color: rgb(255, 255, 255);
}

#produit{
    margin-top: 20px;
    margin-right: 20px;
    background-color:#e7ecf0;
    padding: 1em;
    border-radius: 10px ;
    font-family: Arial, sans-serif;
    font-size: 0.5em;
    text-align: center;
}

#produit:hover{
    background-color:#e7ecf0;
    border-radius: 10px;
    border: solid 2px #0570FF;
}

#nomProd{
    font-weight: bold;
}
#qteProd{
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
}

</style>