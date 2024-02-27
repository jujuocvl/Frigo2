//Un produit
export default class Produit {
    constructor (id, nom, qte, photo) {
        this._nom = nom;
        this._qte = qte;
        this._id = id;
        this._photo = photo;
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
    get photo() {
        return this._photo;
    }
    //Modif nom
    setNom(nom) {
        this._nom = nom;
    }
    setQte(quantité) {
        this._qte += quantité;
    }
    //Affichage
    afficherNom(){
        return `${this._nom}`;
    }
    afficherQte(){
        return `Quantité = ${this._qte}`
    }
}