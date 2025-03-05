import { useAppSelector } from '@/hooks/hook';
import React from 'react';

// import OrderTable from '../components/OrderTable';

const Dashboard : React.FC = () => {
  const { UserData } = useAppSelector((state) => state.auth);
console.log(UserData); 
  return (
    <div>
      <h1>Dashboard</h1>
      {UserData.role === 'Manager' && <button>Create Order</button>}
    </div>
  );
};

export default Dashboard;