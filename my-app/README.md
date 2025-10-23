
# TypeScript

- 타입을 지정

```
npm install -g typescript
```

### 타입의 종류

```
number
string
boolean
null
undefined
any
```

```typescript
let a: number = 3;
let b: string = "hi";
a = "asdasd"; // type error

let c: any = 4; // 어떤 것이든 가능, 기존의 JS처럼 사용 가능, 하지만 플젝에서는 지향하기

let d: number | string = ""; // 문자도 가능 숫자도 가능
d = 3; // 이것도 가능

let e: string[] = ['apple', 'mango'];
e.push(3); // error!

let e1: number[] = [1, 2];
```

함수예제
```typescript
function addNumber(a: number, b: number): number {
    return a + b;
}
```

```
tsc index.ts // 실행방법
```

브라우저는 TS를 이해하지 못한다. JS만 이해한다. 따라서 TS에서 JS로 컴파일을 해줘야한다. 이것을 tsc 명령어가 해줌. 그래서 index.js라는 JS로 컴파일된 파일이 생성

tsconfig.json => 어떤 JS 버전으로 바꿔줄까? 세팅해주는 부분 => 구글링 ㄱㄱ

### 객체 타입 정의하는 법

- 타입 만드는 방법 2가지 type, interface

```typescript
// 타입 생성
export type Restaurant = {
    name: string;
    category: string;
    address: {
        city: string;
        detail: string;
        zipcode: number;
    };
    menu: {
        name: string;
        price: number;
        category: string;
    }[];
}
```

### 타입 안에 type 정의(1)

```typescript
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
```

### useState에서 타입스크립트 사용하기 및 Generic 문법

```typescript
const App: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data); // 이 부분, useState를 사용할 때 Restaurant 타입을 사용할 것이다.

  return (
    ...
  );
}

export default App;
```
만약 setMyRestaurant(4) 를 하는 경우 type 에러가 발생하게 된다.

### interface로 타입 정의(2)

```typescript
import { Restaurant } from "./model/resturant";

interface OwnProps {
    info: Restaurant;
}

// Function Component에 들어오는 타입이 OwnProps다
const Store: React.FC<OwnProps> = (props: OwnProps) => { 
    return (
        <div>Store</div>
    )
}

export default Store;
```

```typescript
const App: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data);

  return (
    <div className="App">
      <Store info={myRestaurant} /> // 에러 사라짐
    </div>
  );
}

export default App;
```

다음과 같이 변경이 가능하다.

```typescript
import { Restaurant } from "./model/resturant";

interface OwnProps {
    info: Restaurant;
}

const Store: React.FC<OwnProps> = ({info}) => {
    return (
        <div>{info.name}</div>
    )
}

export default Store;
```

함수도 보낼 수 있다.

```typescript
const App: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data);

  const changeAddress = (address: Address) => { // 함수를 생성, address 타입은 Address 타입
    setMyRestaurant({...myRestaurant, address: address})
  }

  return (
    <div className="App">
      <Store info={myRestaurant} changeAddress={changeAddress}/> // 함수 보내기
    </div>
  );
}
```

```typescript
import { Address, Restaurant } from "./model/resturant";

interface OwnProps {
    info: Restaurant;
    changeAddress(address: Address): void; // 함수를 받으며 입력받는 값은 Address 타입, 뒤에는 리턴 타입 
}

const Store: React.FC<OwnProps> = ({info}) => {
    return (
        <div>{info.name}</div>
    )
}

export default Store;
```

### interface extends

```typescript
import React from 'react'
import { Menu } from './model/resturant';

interface OwnProps extends Menu { // Menu에 있는 것들 상속
    // name: string;
    // price: number;
    // category: string;
    showBestMenu(name: string): string; // 이것만 추가
}

const BestMenu: React.FC<OwnProps> = ({name, price, category, showBestMenu}) => {
  return (
    <div>
      {name}
    </div>
  )
}

export default BestMenu;
```

```typescript
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
      <BestMenu name="불고기 피자" category="피자" price={1000} showBestMenu={showBestMenu}/>
    </div>
  );
}
```

type에도 상속이 가능하다.

```typescript
type OwnProps = Menu & {
    showBestMenu(name: string): string;
}
```

### Omit 빼주다

Address에서 zipcode가 필요없다면?

```typescript
export type Address = {
    city: string;
    detail: string;
    zipcode: number;
}
```

이런경우에는 아래와 같이 하면 된다.

```typescript
export type Address = {
    city: string;
    detail: string;
    zipcode: number;
}
// Address에서 zipcode만 뺀 타입 생성
export type AddressWithoutZipcode = Omit<Address, 'zipcode'>; 
```

아래의 예시를 보자

```typescript
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
      <BestMenu name="불고기 피자" category="피자" showBestMenu={showBestMenu}/> // price 제거하면 error 발생
    </div>
  );
}
```

```typescript
import React from 'react'
import { Menu } from './model/resturant';

interface OwnProps extends Omit<Menu, 'price'> { // 이 부분을 Omit 형태로 바꾸면 끝
    showBestMenu(name: string): string;
}

const BestMenu: React.FC<OwnProps> = ({name, category, showBestMenu}) => { // price 제거
  return (
    <div>
      {name}
    </div>
  )
}

export default BestMenu;
```

### Pick

Omit의 반대인 특정 값만 가져오고 싶은 부분의 기능

```typescript
export type Restaurant = {
    name: string;
    category: string;
    address: Address;
    menu: Menu[];
}
```

category만 가지고 오고 싶은경우

```typescript
// Restaurant에서 category만 가져온 타입 생성
export type RestaurantOnlyCategory = Pick<Restaurant, 'category'>; 
```

### Omit + Pick ES6 문법

```typescript
export type Address = {
    city: string;
    detail: string;
    zipcode?: number; // 있을 수도 있고 없을 수도 있고
}
```

대신 ?는 주의를 해야한다. 어물쩡 넘어갈 수 있어서.

### API 타입스크립트 사용법

API로 받는 데이터도 타입으로 받을 수 있다.

```typescript
export type ApiResponse<T> = {
    data: T[], // 어떤 타입이든 올 수 있음 => T
    totalPage: number,
    page: number,
}

// 다앙햔 값의 타입을 넣을 수 있음
export type ResturantResponse = ApiResponse<Restaurant>; 
export type MenuResponse = ApiResponse<Menu>;
```