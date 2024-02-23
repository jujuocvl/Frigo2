//Un produit
export default class Produit {
    constructor (id, nom, qte = 1) {
        this._nom = nom;
        this._qte = qte;
        this._id = id
    }
    get nom() {
        return this._nom;
    }
    get id() {
        return this._id
    }
    get qte() {
        return this._qte
    }
    //Modif nom
    set nom(nom) {
        this._nom = nom;
    }
    //Affichage :
    afficherNom(){
        return `${this._nom}`;
    }
    afficherQte(){
        return `Quantité = ${this._qte}`
    }
}