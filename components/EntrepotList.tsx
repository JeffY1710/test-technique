"use client"

import { useEffect, useState } from 'react';
import { Entrepot } from '@prisma/client';

const EntrepotList = () => {
  const [entrepots, setEntrepots] = useState<Entrepot[]>([]);

  useEffect(() => {
    fetch('/api/entrepots')
      .then((res) => res.json())
      .then((data) => setEntrepots(data));
  }, []);

  return (
    <div>
      <h1>Liste des Entrepôts</h1>
      <ul>
        {entrepots.map((entrepot) => (
          <li className='p-5 border border-slate-500' key={entrepot.id}>
            <span className='text-blue-500'>Entrepot:</span>{entrepot.nom} | <span className='text-blue-500'>Localisation:</span> {entrepot.localisation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntrepotList;
