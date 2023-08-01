import { Header } from './components/Header';
import { StatsOfLaunches } from './components/StatsOfLaunches';
import { StatsOfLaunchesByYears } from './components/StatsOfLaunchesByYears';

function App() {
  return (
    <main className='flex flex-col h-screen bg-gray-150 '>
        <Header />
        <StatsOfLaunches />
        <StatsOfLaunchesByYears />
    </main>
  )
}

export default App
