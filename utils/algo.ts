// utils/algo.ts

import { PrismaClient, Client, Commande, DetailCommande, Produit, Entrepot } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction principale pour déterminer quel client peut recevoir sa commande en premier
export async function determinerClientLivraisonRapide(): Promise<string> {
  let clientLivraisonRapide = '';

  try {
    // Récupérer tous les clients avec leurs commandes et les détails des commandes
    const clients = await prisma.client.findMany({
      include: {
        commandes: {
          include: {
            details: true
          }
        }
      }
    });

    // Récupérer tous les entrepôts avec leur stock
    const entrepots = await prisma.entrepot.findMany({
      include: {
        stock: true
      }
    });

    // Récupérer tous les produits avec leur stock
    const produits = await prisma.produit.findMany({
      include: {
        stock: true
      }
    });

    // Parcourir chaque client
    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];
      let peutRecevoir = true;

      // Parcourir les commandes du client
      client.commandes.forEach(commande => {
        commande.details.forEach(detail => {
          // Vérifier si le produit est disponible dans au moins un entrepôt proche
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

      // Si le client peut recevoir sa commande et aucun autre client n'a encore été sélectionné
      if (peutRecevoir && clientLivraisonRapide === '') {
        clientLivraisonRapide = client.nom;
      }
    }

    return clientLivraisonRapide;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw new Error('Erreur lors de la récupération des données');
  }
}
