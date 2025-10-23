import { Address, Restaurant } from "./model/resturant";

interface OwnProps {
    info: Restaurant;
    changeAddress(address: Address): void; // 뒤에는 리턴 타입 
}

const Store: React.FC<OwnProps> = ({info}) => {
    return (
        <div>{info.name}</div>
    )
}

export default Store;