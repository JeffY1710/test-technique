import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    try {
      const produits = await prisma.produit.findMany();
      res.status(200).json(produits);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
