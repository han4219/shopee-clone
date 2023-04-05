import useRouteElements from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const protectedElements = useRouteElements()

  return (
    <div className='h-full w-full'>
      <ToastContainer />
      {protectedElements}
    </div>
  )
}

export default App
