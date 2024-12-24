import { Header } from './components/Header';
import { StatsOfLaunches } from './components/StatsOfLaunches';
import { HistoryLaunches } from './components/HistoryLaunches/index';
import { ColumnStatsLaunhcesByYear } from './components/ColumnStatsLaunchesByYear/ColumnStatsLaunhcesByYear';


function App() {
  return (
    <main className='flex flex-col w-full h-full bg-backgroundPrimary gap-8 '>
        <Header />
        <div className='flex flex-col md:flex-row md:justify-center items-center gap-4'>
          <StatsOfLaunches />
          <ColumnStatsLaunhcesByYear />
        </div>
        <HistoryLaunches />
    </main>
  )
}

export default App
