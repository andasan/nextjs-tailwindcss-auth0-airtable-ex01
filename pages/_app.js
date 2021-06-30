import '../styles/globals.css'
import { TodosProvider } from '../contexts/TodosContext.js'
import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className='container mx-auto my-6'>
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  )
}

export default MyApp
