import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './Store';
import { Address, Restaurant } from './model/resturant';
import BestMenu from './BestMenu';

let data: Restaurant = {
  name: "누나네 식당",
  category: "western",
  address: {
    city: "Seoul",
    detail: "123-12",
    zipcode: 12345
  },
  menu: [
    {
      name: "rose pasta",
      price: 20000,
      category: "PASTA"
    },
    {
      name: "steak",
      price: 30000,
      category: "STEAK"
    }
  ]
}

const App: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data);

  const changeAddress = (address: Address) => {
    setMyRestaurant({...myRestaurant, address: address})
  }

  const showBestMenu = (name: string) => {
    return name;
  }

  return (
    <div className="App">
      <Store info={myRestaurant} changeAddress={changeAddress}/>
      <BestMenu name="불고기 피자" category="피자" showBestMenu={showBestMenu}/>
    </div>
  );
}

export default App;
