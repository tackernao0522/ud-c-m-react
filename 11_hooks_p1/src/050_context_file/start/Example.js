import Header from './components/Header'
import Main from './components/Main'
import ThemeProvider from './context/ThemeContext'
import './Example.css'

const Example = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default Example
