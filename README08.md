## 47. [更新は即時ではない] ステート使用上の注意点！

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
  }
  const countDown = () => {
    setCount(count - 1)
  }

  return (
    <>
      <p>{`現在のカウント数: ${count}`}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  )
};

export default Example;
```

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1) // この時点でのcountは0
    setCount(count + 1) // この時点でのcountも0になる 延々と0になる
    console.log(count) // 最初のクリックは '0'と表示される
  }
  const countDown = () => {
    setCount(count - 1)
  }

  return (
    <>
      <p>{`現在のカウント数: ${count}`}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  )
};

export default Example;
```

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
    setCount(prevstate => prevstate + 1 ) // count + 2になる
    console.log(count)
  }
  const countDown = () => {
    setCount(count - 1)
  }

  return (
    <>
      <p>{`現在のカウント数: ${count}`}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  )
};

export default Example;
```

## 48. [練習] ステートの処理を自分で記述してみよう

+ `05_state_and_event/src/055_practice_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
  }
  const countDown = () => {
    setCount(count - 1)
  }

  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードのように+と-ボタンをクリックすると現在のカウント数が1ずつ増減する機能を実装してください。*useStateを用いてcountとsetCountを定義してください。
      </p>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```
## 49. オブジェクト型のステートを使う際の注意点！

+ プリミティブ型: 1, "str", bool, 10n, Symbol(), null, undefined<br>

+ オブジェクト型: {}, []などのプリミティブ型以外<br>

+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
    </>
  )
}

export default Example
```

+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    setPerson({ name: e.target.value, age: person.age })
  }
  const changeAge = (e) => {
    setPerson({ name: person.name, age: e.target.value })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
    </>
  )
}

export default Example
```

+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    setPerson({ name: e.target.value, age: person.age })
  }
  const changeAge = (e) => {
    setPerson({ name: person.name, age: e.target.value })
  }
  const reset = () => {
    setPerson({ name: '', age: '' })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
      <div>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

## 50. [重要] オブジェクトのステートは新しいオブジェクトを設定する！

+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    setPerson({ name: e.target.value, age: person.age }) // 新しいオブジェクトが生成されることになる
  }
  const changeAge = (e) => {
    setPerson({ name: person.name, age: e.target.value })　// 新しいオブジェクトが生成されることになる
  }
  const reset = () => {
    setPerson({ name: '', age: '' })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
      <div>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    console.log({ ...person } === person) // false よって新しい別のオブジェクトが生成されていることになる
    console.log({ ...person })
    setPerson({ ...person, name: e.target.value }) // 新しいオブジェクトが生成されることになる
  }
  const changeAge = (e) => {
    setPerson({ ...person, age: e.target.value }) // 新しいオブジェクトが生成されることになる
  }
  const reset = () => {
    setPerson({ name: '', age: '' })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
      <div>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```
+ `05_state_and_event/src/060_state_object/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    console.log({ ...person } === person) // false よって新しい別のオブジェクトが生成されていることになる
    console.log({ ...person })
    setPerson({ ...person, name: e.target.value, age: 20 }) // 新しいオブジェクトが生成されることになる
  }
  const changeAge = (e) => {
    setPerson({ ...person, age: e.target.value }) // 新しいオブジェクトが生成されることになる
  }
  const reset = () => {
    setPerson({ name: '', age: '' })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
      <div>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

## 51. [練習] オブジェクトのステートを更新

+ `05_state_and_event/src/068_practice_obj_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react';

const Example = () => {
  const orderObj = { item: 'apple', count: 10 };
  const [order, setOrder] = useState(orderObj);
  const changeItem = (e) => {
    setOrder({ ...order, item: e.target.value })
  };
  const countUp = () => {
    setOrder({ ...order, count: order.count + 1 })
  };
  const countDown = () => {
    setOrder({ ...order, count: order.count - 1 })
  };
  return (
    <div>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードのように「+と-ボタンをクリックするとCountの表示が1ずつ増減する機能」と「input要素に連動してItemの表示が変更される機能」を実装してください。コンポーネントの外側（上部）に変数や関数を準備しているためうまく使ってください。
      </p>
      <h3>Item:{order.item}</h3>
      <h3>Count:{order.count}</h3>
      <input type="text" value={order.item} onChange={changeItem} />
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </div>
  );
};

export default Example;
```

+ `05_state_and_event/src/068_practice_obj_state/start/Example.js`を編集(なお良い)<br>

```js:Example.js
import { useState } from 'react';

const Example = () => {
  const orderObj = { item: 'apple', count: 10 };
  const [order, setOrder] = useState(orderObj);
  const changeItem = (e) => {
    setOrder(order => ({ ...order, item: e.target.value })) // 編集
  };
  const countUp = () => {
    setOrder(order => ({ ...order, count: order.count + 1 })) // 編集
  };
  const countDown = () => {
    setOrder(order => ({ ...order, count: order.count - 1 })) // 編集
  };
  return (
    <div>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードのように「+と-ボタンをクリックするとCountの表示が1ずつ増減する機能」と「input要素に連動してItemの表示が変更される機能」を実装してください。コンポーネントの外側（上部）に変数や関数を準備しているためうまく使ってください。
      </p>
      <h3>Item:{order.item}</h3>
      <h3>Count:{order.count}</h3>
      <input type="text" value={order.item} onChange={changeItem} />
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </div>
  );
};

export default Example;
```
