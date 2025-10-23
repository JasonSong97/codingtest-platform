import React from 'react'
import { Menu } from './model/resturant';

interface OwnProps extends Omit<Menu, 'price'> { // 있다고 가정
    // name: string;
    // price: number;
    // category: string;
    showBestMenu(name: string): string;
}

const BestMenu: React.FC<OwnProps> = ({name, category, showBestMenu}) => {
  return (
    <div>
      {name}
    </div>
  )
}

export default BestMenu;