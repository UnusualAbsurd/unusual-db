# UnusualDB
### UnusualDB is a npm package that helps you use mongoose more easier.

# Setup
```js
const { unusualdb } = require('unusual-db')

const db = new unusualdb("MONGODB SRV")

module.exports = db;
```

### Usages 📌

#### Set ( Creates a new document )
```js
await db.set('KEY', 'VALUE')
```

### Find ( Gets the value of a document )
```js
await db.find(`KEY`) // returns VALUE
```

### Delete ( Deletes a document that has the key )
```js
await db.delete(`KEY`) 
```

### Push ( Push a data into a value );
```js
await db.push(`KEY`, [value1, value2]);
```