 Reactivity
===========

As the name says, **Reactivity** is a lightweight javascript library to create simple reactive objects. Inspired in [*Redux*](https://redux.js.org/) and [*Vuex*](https://vuex.vuejs.org/)

Get started
===========

### NPM:

```bash
npm install @darudlingilien/reactivity 
```

Then...

```javascript
import Reactivity from '@darudlingilien/reactivity'
```
### CDN:

```html
<script src="https://unpkg.com/@darudlingilien/reactivity@1.0.2/cdn/reactivity.min.js"></script>
```

Usage
=====

First, ``Reactivity`` must be instantiated 

```javascript
const Reactive = new Reactivity();
```

The ``Reactivity`` constructor receives one paramater, an ``options`` parameter, which needs to receive all the data, middlewares and callbacks. For example...

```javascript
new Reactivity({
    data: {
        msg: {
            type: String,
        }
    },
    beforeUpdating({ msg }) {
        console.log(msg);
    },
    updated({ msg }) {
        console.log(msg);
    },
    middlewares: {
        setters: {
            isEqualToHelloWorld(_, __, value) {
                return value === "Hello world";
            }
        },
        getters: //...
    }
});
```

## About ``options`` properties...

1. ``data`` is required, each of its properties must have two sub-properties, ``type`` and ``value``. This last one is optional, but ``type`` is required, it must be a **build-in** object constructor, like ***String***, ***Boolean***, ***Array***...
2. ``beforeUpdating/updated``, could be functions or objects (with functions of course), the parameter is the current state of the ``data``
3. ``middlewares`` property has two sub-properties, ``setters`` and ``getters``, each function defined in both properties receives the same parameters of a **Proxy** ``get`` and ``set`` [traps](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) and must return a **boolean**, otherwise it will fail

Actions
=======

## For set a property...

```javascript
Reactive.data.msg = "Hello world";
```

## For get a property...

```javascript
console.log(Reactive.data.msg);
```

All these actions will trigger all callbacks, either ``beforeUpdating/updated`` and ``middlewares``

### ***That's it, I hope you enjoy these package!***