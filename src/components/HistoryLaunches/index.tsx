import { Line } from './Line';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getByListLaunches } from '../../services/request';
import Navigation from './Navigation/Navigation';
import { Table, TableBody, TableHead, TableHeader } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function HistoryLaunches(){
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) ?? 1;
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["launches", page, search],
    queryFn: async () => {
      const response = await getByListLaunches(search, page);
      return response;
    }
  });

  const launches = data?.launches ?? [];
  const hasNext = data?.hasNext ?? false;
  const hasPrev = data?.hasPrev ?? false;
  const totalPages = data?.totalPages ?? 0;

  return (<div className='flex flex-col justify-center gap-8'>
    <div className='flex justify-center'>
      <h1 className='text-xl text-white font-bold'>
        Registros de lançamentos
      </h1>
    </div>
    <div className='flex justify-center items-center '>
      <div className='flex flex-row gap-4 items-center w-[60%] mx-auto'>
      <Input
          className='bg-white w-full'
          onChange={(e)=>{
            setValueSearch(e.target.value);
          }}
          value={valueSearch}
          placeholder="Digite para filtrar"

      /> 
      <Button
        className='bg-violet-700'
        onClick={()=>{
          setSearch(valueSearch);
        }}
      >Pesquisar</Button>
      </div>
    </div>

    <div className='md:flex md:justify-center md:items-center'>
      <div className='bg-white md:w-[60%] md:justify-center rounded-2xl shadow-sm p-2'>       
        <Table>
          <TableHeader>
              <TableHead >
                Nº Voo
              </TableHead>
              <TableHead >
                Logo
              </TableHead>
              <TableHead >
                Missão
              </TableHead>
              <TableHead >
                Data de lançamento
              </TableHead>
              <TableHead >
                Foguete
              </TableHead>
              <TableHead>
                Resultado
              </TableHead>
              <TableHead >
                Vídeo
              </TableHead>
          </TableHeader>
          <TableBody>
            {
              launches && launches.map(({date_utc, flight_number, name, rocket, success, webcast, id})=>{
                  return (<Line 
                    date_utc={date_utc}
                    flight_number={flight_number}
                    name={name}
                    rocket_name={rocket.name}
                    success={success}
                    webcast={webcast}
                    key={id}
                  />)
              })
            }
          </TableBody>
        </Table>
        <Navigation 
          page={page} 
          totalPages={totalPages} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
        </div>
      </div>
  </div>)
}