import useRouteElements from './Routes'

function App() {
  const protectedElements = useRouteElements()

  return <div className='h-full w-full'>{protectedElements}</div>
}

export default App
