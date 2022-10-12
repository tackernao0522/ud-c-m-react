/* eslint-disable no-unused-vars */
import { useUpdateTheme } from '../context/ThemeContext'

const Footer = () => {
  const setTheme = useUpdateTheme()

  console.log('footer')
  return (
    <footer>
      <h1>フッター</h1>
    </footer>
  )
}

export default Footer
