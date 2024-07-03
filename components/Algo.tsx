"use client"

import React from 'react';
import { firstClient } from '../utils/algo';

const Algo: React.FC = () => {
  const executeLivraisonClient = async () => {
    try {
      const clientLivraisonRapide = await firstClient();
      console.log(`Le client qui peut recevoir sa commande est : ${clientLivraisonRapide}`);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de l\'algorithme :', error);
    }
  };

  return (
    <div>
      <h1 className='font-bold text-xl'>Algo result: </h1><br />
      <button className='border transition hover:bg-slate-500 border-slate-500 p-5 rounded' onClick={() => executeLivraisonClient()}>Exécuter l'algorithme</button>
    </div>
  );
};

export default Algo;
