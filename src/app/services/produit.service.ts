import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[];

  constructor(private http: HttpClient) {}

  listeProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiURL);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURL, prod, httpOptions);
  }

  supprimerProduit(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURL, prod, httpOptions);
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit > n2.idProduit) {
        return 1;
      }
      if (n1.idProduit < n2.idProduit) {
        return -1;
      }
      return 0;
    });
  }

  listeCategorie(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/products-category/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/productsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
  }

}
