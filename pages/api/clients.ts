import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clients = await prisma.client.findMany();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des clients" });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
