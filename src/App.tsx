import { useContext, useEffect } from 'react'
import useRouteElements from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppAuthContext } from './contexts/AuthContext'
import { EventTargetFromLS } from './utils/auth'

function App() {
  const protectedElements = useRouteElements()

  const { reset } = useContext(AppAuthContext)

  useEffect(() => {
    EventTargetFromLS.addEventListener('clearLS', reset)

    return () => {
      EventTargetFromLS.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div className='h-full w-full'>
      <ToastContainer />
      {protectedElements}
    </div>
  )
}

export default App
