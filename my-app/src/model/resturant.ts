// let data = {
//   name: "누나네 식당",
//   category: "western",
//   address: {
//     city: "Seoul",
//     detail: "123-12",
//     zipcode: 12345
//   },
//   menu: [
//     {
//       name: "rose pasta",
//       price: 20000,
//       category: "PASTA"
//     },
//     {
//       name: "steak",
//       price: 30000,
//       category: "STEAK"
//     }
//   ]
// }

// 타입 생성
export type Restaurant = {
    name: string;
    category: string;
    address: Address;
    menu: Menu[];
}

export type Address = {
    city: string;
    detail: string;
    zipcode: number;
}

export type Menu = {
    name: string;
    price: number;
    category: string;
}

export type AddressWithoutZipcode = Omit<Address, 'zipcode'>; // Address에서 zipcode만 뺀 타입 생성
export type RestaurantOnlyCategory = Pick<Restaurant, 'category'>; // Restaurant에서 category만 가져온 타입 생성

export type ApiResponse<T> = {
    data: T[], // 어떤 타입이든 올 수 있음 => T
    totalPage: number,
    page: number,
}

// 다앙햔 값의 타입을 넣을 수 있음
export type ResturantResponse = ApiResponse<Restaurant>; 
export type MenuResponse = ApiResponse<Menu>;