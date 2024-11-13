//Приклад гарного та поганого форматування

// Поганий приклад
import { PostDto } from '~types/post/post.dto'
import {  ErrorException   } from "~types/error/error.type"


export const  CreatePost =()=> {
  const navigate = useNavigate()
  const content  = useRef<HTMLSpanElement>(null )
  const [ createPost  ] = useCreatePostMutation()
  const user = useAppSelector(state => state.userSlice.user)

// Гарний приклад

import { PostDto } from '~types/post/post.dto'
import { ErrorException } from '~types/error/error.type'


export const CreatePost = () => {
  const navigate = useNavigate()
  const content = useRef<HTMLSpanElement>(null)
  const [createPost] = useCreatePostMutation()
  const user = useAppSelector(state => state.userSlice.user)

//  Приклад гарного та поганого виикористання назв змінних

// Поганий приклад
function isBetween(a1: number, a2: number, a3: number): boolean {
  return a2 <= a1 && a1 <= a3;
}
// Гарний приклад
function isBetween(value: number, left: number, right: number): boolean {
  return left <= value && value <= right;
}


// Приклад гарного та поганого виикористання легко вимовних змін

// Поганий приклад
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
// Гарний приклад
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}

//Приклад гарного та поганого виикористання camelCase для змінних та функцій

// Поганий приклад
var FooVar;
function BarFunc() { }

// Гарний приклад
var fooVar;
function barFunc() { }

//Приклад гарного та поганого виикористання негативних назв для булевих змінних

// Поганий приклад
const isNotEnabled = true;

// Гарний приклад
const isEnabled = false;

//Приклад гарного та поганого виикористання типізації за допомого ключових слів type та interface

// Поганий приклад
const user: any = { name: "John", age: 25 };

// Гарний приклад
interface User {
  name: string;
  age: number;
}

const user: User = { name: "John", age: 25 };2 const isNotEnabled = true;

//Приклад гарного та поганого виикористання наслідування від інтерфейсів або типів

// Поганий приклад
interface Animal {
  name: string;
}

interface Dog {
  name: string;
  breed: string;
}

// Гарний приклад
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

//Приклад гарного та поганого виикористання модифікаторів доступу

// Поганий приклад
class User {
  name: string;
  age: number;
  password: string;
}

const user = new User();
user.password = "12345"

// Гарний приклад
class User {
  name: string;
  age: number;
  private password: string;

  constructor(password: string) {
    this.password = password
  }

  changePassword(newPassword: string) {
    this.password = newPassword
  }
}

// Приклад гарного та поганого виикористання констант та enum`ів

// Поганий приклад
const STATUS_NEW = "new";
const STATUS_IN_PROGRESS = "in progress";
const STATUS_DONE = "done";

// Гарний приклад
enum Status {
  New = "new",
  InProgress = "in progress",
  Done = "done"
}

const currentStatus: Status = Status.New;

//Приклад гарного та поганого уникання неявних any

// Поганий приклад
function calculate(value) {
  return value * 2;
}

// Гарний приклад
function calculate(value: number): number {
  return value * 2;
}