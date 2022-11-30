## 187. Linkを使って画面遷移を行おう

+ `17_next_p1/start/src/pages/index.js`を編集<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/07_router">
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a> // 画面遷移されてしまう
    </>
  )
}
```

+ localhost:3000にアクセスして リンク箇所をクリックすると `Blog Page`に遷移する<br>

+ `17_next_p1/start/src/pages/index.js`を編集<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/07_router" as="/dummy-url">
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a>
    </>
  )
}
```

+ localhost:3000にアクセスして リンク箇所をクリックすると `Blog Page`に遷移先のURLは http://localhost:3000/dummy-url になる<br>

+ `17_next_p1/start/src/pages/index.js`を編集(オブジェクト形式での書き方)<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: '/07_router', query: { key: 'value' } }}> // 遷移先のURLは http://localhost:3000/07_router?key=value になる
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a>
    </>
  )
}
```

+ `17_next_p1/start/src/pages/index.js`を編集(オブジェクト形式での書き方)<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: '/07_router', query: { key: 'value' } }}>
        <a>/07_router</a>
      </Link>
      // 編集
      <Link href="/07_router/hello/setting">
        <a>/07_router</a>
      </Link>
      // ここまで
    </>
  )
}
```

## 188. シングルコンポーネントで複数画面を作成する方法

+ `17_nextjs_p1/start/src/pages/08_multipage/index.js`を編集<br>

```js:index.js
import { useRouter } from 'next/router'

export default function MultiPage() {
  const router = useRouter()
  const step = router.query.step ?? 0

  const goToStep = (_step, asPath) => {
    router.push(`/08_multipage?step=${_step}`, asPath)
  }

  return (
    <div>
      {step == 0 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(1, '/personal')}>Next Step</button>
        </>
      )}
      {step == 1 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(2, '/confirm')}>Next Step</button>
        </>
      )}
      {step == 2 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(0, '/08_multipage')}>
            Next Step
          </button>
        </>
      )}
    </div>
  )
}
```

+ http://localhost:3000/08_multipage にアクセスしてみる<br>

+ `17_nextjs_p1/start/next.config.js`を編集<br>

```js:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/personal',
        destination: '/08_multipage?step=1',
      },
      {
        source: '/confirm',
        destination: '/08_multipage?step=2',
      },
    ]
  },
}

module.exports = nextConfig
```

+ サーバーを一度再起動する<br>

+ localhost:3000/personal へアクセスしてみる<br>

## 189. コンポーネント間で状態を共有する方法について学ぼう

+ `$ mkdir 17_nextjs_p1/start/src/pages/09_multipage_state`を実行<br>

+ `$ touch 17_nextjs_p1/start/src/pages/09_multipage_state/{index.js,list.js}`を実行<br>

+ `$ mkdir 17_nextjs_p1/start/src/context && touch $_/AppContext.js`を実行<br>

+ `17_nextjs_p1/start/src/context/AppContext.js`を編集<br>

```js:AppContext.js
import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([])

  return (
    <AppContext.Provider value={[list, setList]}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
```

+ `17_next_p1/start/src/pages/09_multipage_state/index.js`を編集<br>

```js:index.js
import { useState } from 'react'
import Form from '../../components/form'
import List from '../../components/list'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/AppContext'

export default function PageLink() {
  const initialState = { name: '', birth: '' }
  const [value, setValue] = useState(initialState)
  const [list, setList] = useAppContext()
  const router = useRouter()

  const handleChange = (e) => {
    const inputId = e.target.id
    const inputValue = e.target.value
    setValue((prev) => ({ ...prev, [inputId]: inputValue }))
  }
  const handleAddClick = () => {
    setList((prev) => [...prev, { ...value, id: new Date().getTime() }])
    setValue(initialState)
  }
  const handleResetClick = () => {
    setList([])
  }

  return (
    <div>
      <Form
        handleAddClick={handleAddClick}
        handleResetClick={handleResetClick}
        handleChange={handleChange}
        nameValue={value.name}
        birthValue={value.birth}
      />
      <List list={list} />
      <button onClick={() => router.push('/09_multipage_state/list')}>
        リストページへ
      </button>
      <Link href="／09_multipage_state/list">
        <a>アンカータグ</a>
      </Link>
    </div>
  )
}
```

+ `17_nextjs_p1/start/src/pages/09_multipage_state/list.js`を編集<br>

```js:list.js
import { useRouter } from 'next/router'
import List from '../../components/list'
import { useAppContext } from '../../context/AppContext'

export default function PageList() {
  const [list] = useAppContext()
  const router = useRouter()

  return (
    <>
      <List list={list} />
      <button onClick={() => router.back()}>前のページへ</button>
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/09_multipage_state/index.js`を編集<br>

```js:index.js
import { useState } from 'react'
import Form from '../../components/form'
import List from '../../components/list'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/AppContext'

export default function PageLink() {
  const initialState = { name: '', birth: '' }
  const [value, setValue] = useState(initialState)
  const [list, setList] = useAppContext() // カットする
  const router = useRouter()

  const handleChange = (e) => {
    const inputId = e.target.id
    const inputValue = e.target.value
    setValue((prev) => ({ ...prev, [inputId]: inputValue }))
  }
  const handleAddClick = () => {
    setList((prev) => [...prev, { ...value, id: new Date().getTime() }])
    setValue(initialState)
  }
  const handleResetClick = () => {
    setList([])
  }

  return (
    <div>
      <Form
        handleAddClick={handleAddClick}
        handleResetClick={handleResetClick}
        handleChange={handleChange}
        nameValue={value.name}
        birthValue={value.birth}
      />
      <List list={list} />
      <button onClick={() => router.push('/09_multipage_state/list')}>
        リストページへ
      </button>
      <Link href="/09_multipage_state/list">
        <a>アンカータグ</a>
      </Link>
    </div>
  )
}
```

+ `17_nextjs_p1/start/src/context/AppContext.js`を編集<br>

```js:AppContext.js
import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]) // カットしたのをここで使う

  return (
    <AppContext.Provider value={[list, setList]}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
```

+ `17_nextjs_p1/start/src/pages/_app.js`を編集<br>

```js:_app.js
import { AppProvider } from '../context/AppContext' // 追加
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider> // 追加
      <Component {...pageProps} />
    </AppProvider> // 追加
  )
}

export default MyApp
```

+ `17_nextjs_p1/start/src/pages/09_multipage_state/index.js`を編集<br>

```js:index.js
import { useState } from 'react'
import Form from '../../components/form'
import List from '../../components/list'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/AppContext' // 追加

export default function PageLink() {
  const initialState = { name: '', birth: '' }
  const [value, setValue] = useState(initialState)
  const [list, setList] = useAppContext() // 追加
  const router = useRouter()

  const handleChange = (e) => {
    const inputId = e.target.id
    const inputValue = e.target.value
    setValue((prev) => ({ ...prev, [inputId]: inputValue }))
  }
  const handleAddClick = () => {
    setList((prev) => [...prev, { ...value, id: new Date().getTime() }])
    setValue(initialState)
  }
  const handleResetClick = () => {
    setList([])
  }

  return (
    <div>
      <Form
        handleAddClick={handleAddClick}
        handleResetClick={handleResetClick}
        handleChange={handleChange}
        nameValue={value.name}
        birthValue={value.birth}
      />
      <List list={list} />
      <button onClick={() => router.push('/09_multipage_state/list')}>
        リストページへ
      </button>
      <Link href="/09_multipage_state/list">
        <a>アンカータグ</a>
      </Link>
    </div>
  )
}
```

+ `17_nextjs_p1/start/src/pages/09_multipage_state/list.js`を編集<br>

```js:list.js
import { useRouter } from 'next/router'
import List from '../../components/list' // 追加
import { useAppContext } from '../../context/AppContext'

export default function PageList() {
  const [list] = useAppContext() // 追加
  const router = useRouter()

  return (
    <>
      <List list={list} /> // 追加
      <button onClick={() => router.back()}>前のページへ</button>
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/09_multipage_state/index.js`を編集<br>

```js:index.js
import { useState } from 'react'
import Form from '../../components/form'
import List from '../../components/list'
import Link from 'next/link' // 追加
import { useRouter } from 'next/router' // 追加
import { useAppContext } from '../../context/AppContext'

export default function PageLink() {
  const initialState = { name: '', birth: '' }
  const [value, setValue] = useState(initialState)
  const [list, setList] = useAppContext()
  const router = useRouter() // 追加

  const handleChange = (e) => {
    const inputId = e.target.id
    const inputValue = e.target.value
    setValue((prev) => ({ ...prev, [inputId]: inputValue }))
  }
  const handleAddClick = () => {
    setList((prev) => [...prev, { ...value, id: new Date().getTime() }])
    setValue(initialState)
  }
  const handleResetClick = () => {
    setList([])
  }

  return (
    <div>
      <Form
        handleAddClick={handleAddClick}
        handleResetClick={handleResetClick}
        handleChange={handleChange}
        nameValue={value.name}
        birthValue={value.birth}
      />
      // 追加
      <List list={list} />
      <button onClick={() => router.push('/09_multipage_state/list')}>
        リストページへ
      </button>
      // ここまで
      // 追加
      <Link href="/09_multipage_state/list">
        <a>アンカータグ</a>
      </Link>
      // ここまで
    </div>
  )
}
```