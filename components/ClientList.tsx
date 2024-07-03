"use client"

import { useEffect, useState } from 'react';
import { Client } from '@prisma/client';

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div>
      <h1>Liste des Clients</h1>
      <ul>
        {clients.map((client) => (
          <li className='p-5 border border-slate-500' key={client.id}>
            <span className='text-blue-500'>Client: </span>{client.nom} | <span className='text-blue-500'>Localisation: </span>{client.localisation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
