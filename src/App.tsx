import { Header } from './components/Header';
import { StatsOfLaunches } from './components/StatsOfLaunches';
import { StatsOfLaunchesByYears } from './components/StatsOfLaunchesByYears';
import { HistoryLaunches } from './components/HistoryLaunches/index';

function App() {
  return (
    <main className='flex flex-col bg-gray-150 '>
        <Header />
        <StatsOfLaunches />
        <StatsOfLaunchesByYears />
        <HistoryLaunches />
    </main>
  )
}

export default App
