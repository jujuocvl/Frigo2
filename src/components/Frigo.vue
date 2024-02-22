<script setup>
import { reactive, onMounted } from "vue";
import { url } from '../urlapi.js';

const ContenuF = {
    id: "",
    nom: "",
    qte: ""
};

let data = reactive({
    formulaireLivre: { ...ContenuF },
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
onMounted(AfficheFrigo);

</script>

<template>

</template>

<style>
</style>