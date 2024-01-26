// en el caso de que quiera usar el toSorted que no esta soportado en typescript

/* declaración global en TypeScript para extender la interfaz Array<T> y añadir un método personalizado llamado toSorted. Veamos línea por línea qué está haciendo:

1. declare global {: Esto indica que estás declarando algo en el ámbito global de TypeScript.

2. interface Array<T> {: Estás extendiendo la interfaz Array<T>. En TypeScript, las interfaces definen la forma que debe tener un objeto. En este caso, estás extendiendo la interfaz para todos los arrays.

3. toSorted(compareFn?: (a: T, b: T) => number): T[]: Estás añadiendo un nuevo método llamado toSorted a la interfaz de todos los arrays. Este método acepta un argumento opcional compareFn, que es una función que toma dos elementos del array (a y b) y devuelve un número. El método toSorted devuelve un nuevo array ordenado según la función de comparación proporcionada.

En resumen, con esta declaración, estás diciendo que todos los arrays en tu aplicación (en el ámbito global) ahora tienen un método adicional llamado toSorted que te permite ordenar los elementos del array según una función de comparación personalizada. */

// la T es que el tipo de parametro se lo vamos aindicar nosotrs
declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export interface Welcome {
  results: User[]
  info: Info
}

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface User {
  gender: Gender
  name: Name
  location: Location
  email: string
  login: Login
  dob: Dob
  registered: Dob
  phone: string
  cell: string
  id: ID
  picture: Picture
  nat: string
}

export interface Dob {
  date: Date
  age: number
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export interface ID {
  name: string
  value: null | string
}

export interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: number | string
  coordinates: Coordinates
  timezone: Timezone
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Street {
  number: number
  name: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: Title
  first: string
  last: string
}

export enum Title {
  MS = 'Ms',
  Madame = 'Madame',
  Miss = 'Miss',
  Monsieur = 'Monsieur',
  Mr = 'Mr',
  Mrs = 'Mrs',
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}
