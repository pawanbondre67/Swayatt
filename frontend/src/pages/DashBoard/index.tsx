import { useAppSelector } from '@/hooks/hook';
import React from 'react';

// import OrderTable from '../components/OrderTable';

const Dashboard : React.FC = () => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'Manager' && <button>Create Order</button>}
    </div>
  );
};

export default Dashboard;