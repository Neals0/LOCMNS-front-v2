import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent implements OnInit {
  produits!: Produit[]; //un tableau de produits

  constructor(
    private produitService: ProduitService,
    public authService: AuthService
  ) {
    // this.produits = this.produitService.listeProduits();
  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.listeProduits().subscribe((prods) => {
      // console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(p: Produit) {
    let conf = confirm('Êtes-vous sûr ?');
    if (conf) {
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log('produit supprimé');
        this.chargerProduits();
      });
    }
  }
}
