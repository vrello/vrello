# vrellodb

> simple database solution, made for node and electron applications

## Install

```
$ npm install vrellodb
```

## Usage

```ts
import { vrello } from 'vrellodb'

const db = vrello({ path: '...your path here...' }) // Load the database from file

// Set default values
db.default('monkey', { 
  name: 'Martha', 
  age: 12, 
  state: 'feeling hungry', 
  location: 'Africa', 
  bananas: [] 
})

...

// You can append data to an existing array in your database
db.append('monkey.bananas', {
  ripeness: 98,
  wasTasty: true
})

// Or, you could change and update values in your database
db.set('monkey.state', 'feeling full')

// Or, check the size of existing arrays
db.size('monkey.bananas') // => 1

// And even read the values of items
db.get('monkey.name') // => 'Martha'
```

## Options
There are options you can apply to the `vrello` function to change the behaviour of the database.

### path: string
This is the path of the database that Vrello will load or create.

### security: object *optional*
* **idLength**: number *optional* - `This is the length of all IDs that will be generated. Default is 16.`

### metadata: object *optional*
* **addDates**: boolean *optional* - `This will add "lastModified" and "dateCreated" to all objects that are added to the database.`
* **addIds**: boolean *optional* - `This will automatically generate an id for every object you add to the database. You can change the length of the id generated by changing "options.idLength". `

## 📜 License
**vrellodb** is licensed under the [AGPL-3.0](https://opensource.org/licenses/AGPL-3.0). Quick rundown, whilst other licenses are intended to take away your freedoms, **AGPL-3.0** intends to allow to exercise your freedoms with this open-sourced software.
