"use client"

import { useEffect, useState } from 'react';
import { Produit } from '@prisma/client';

const ProduitList = () => {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    fetch('/api/produits')
      .then((res) => res.json())
      .then((data) => setProduits(data));
  }, []);

  return (
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        {produits.map((produit) => (
          <li className='p-5 border border-slate-500' key={produit.id}>
            <span className='text-blue-500'>Produit:</span> {produit.nom} | <span className='text-blue-500'>Description: </span>{produit.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProduitList;
