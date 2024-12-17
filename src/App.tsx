import { Header } from './components/Header';
import { StatsOfLaunches } from './components/StatsOfLaunches';
import { StatsOfLaunchesByYears } from './components/StatsOfLaunchesByYears';
import { HistoryLaunches } from './components/HistoryLaunches/index';


function App() {
  return (
    <main className='flex flex-col h-screen bg-backgroundPrimary '>
        <Header />
        <div className='flex flex-col md:flex-row md:justify-center md:items-center md:gap-4'>
          <StatsOfLaunches />
          <StatsOfLaunchesByYears />
        </div>
        <HistoryLaunches />
    </main>
  )
}

export default App
