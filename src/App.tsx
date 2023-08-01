import { Header } from './components/Header';
import { StatsOfLaunches } from './components/StatsOfLaunches';

function App() {
  return (
    <main className='flex flex-col h-screen bg-gray-150 '>
        <Header />
        <StatsOfLaunches />
    </main>
  )
}

export default App
