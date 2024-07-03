// utils/algo.ts

import { PrismaClient, Client, Commande, DetailCommande, Produit, Entrepot } from '@prisma/client';

const prisma = new PrismaClient();

export async function firstClient(): Promise<string> {
  let clientLivraisonRapide = '';

  try {
    const clients = await prisma.client.findMany({
      include: {
        commandes: {
          include: {
            details: true
          }
        }
      }
    });

    const entrepots = await prisma.entrepot.findMany({
      include: {
        stock: true
      }
    });

    const produits = await prisma.produit.findMany({
      include: {
        stock: true
      }
    });

    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];
      let peutRecevoir = true;

      client.commandes.forEach(commande => {
        commande.details.forEach(detail => {
          // Vérifie si le produit est disponible dans au moins un entrepôt proche
          const entrepotsPossibles = entrepots.filter(entrepot =>
            entrepot.localisation !== client.localisation &&
            entrepot.stock.some(stock =>
              stock.produitId === detail.produitId &&
              stock.quantite >= detail.quantite
            )
          );

          if (entrepotsPossibles.length === 0) {
            peutRecevoir = false;
          }
        });
      });

      // Vérifie si le client peut recevoir sa commande et aucun autre client n'a encore été sélectionné
      if (peutRecevoir && clientLivraisonRapide === '') {
        clientLivraisonRapide = client.nom;
      }
    }

    return clientLivraisonRapide;
  } catch (error) {
    console.error('Error', error);
    throw new Error('Error');
  }
}
