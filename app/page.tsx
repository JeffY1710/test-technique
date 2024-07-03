import ProduitList from '../components/ProduitList';
import EntrepotList from '../components/EntrepotList';
import ClientList from '../components/ClientList';
import Algo from '@/components/Algo';

export default function Home() {
  return (
    <div className='flex gap-5'>
      <h1 className='text-xl font-bold '>Gestion des Entrepôts</h1>
      <ProduitList />
      <EntrepotList />
      <ClientList />
      <Algo/>
    </div>
  );
}
