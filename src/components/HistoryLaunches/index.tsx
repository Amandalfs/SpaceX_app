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
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["launches", page, search],
    queryFn: async () => {
      const response = await getByListLaunches(search, page);
      return response;
    }
  });

  return (<div className='flex flex-col justify-center gap-8 '>
    <div className='flex justify-center'>
      <h1 className='text-xl text-[#222] font-bold'>
        Registros de lançamentos
      </h1>
    </div>
    <div className='flex justify-center items-center'>
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

    <div className='md:flex md:justify-center md:items-center border-2 '>
      <div className='border flex-col rounded-2xl shadow-sm p-2'>       
        <Table>
          <TableHeader >
              <TableHead className="px-8">
                Nº Voo
              </TableHead>
              <TableHead className="px-8">
                Logo
              </TableHead>
              <TableHead className="px-8">
                Missão
              </TableHead>
              <TableHead className="px-8">
                Data de lançamento
              </TableHead>
              <TableHead className="px-8">
                Foguete
              </TableHead>
              <TableHead className="px-8">
                Resultado
              </TableHead>
              <TableHead className="px-8">
                Vídeo
              </TableHead>
          </TableHeader>
          <TableBody>
            {
              data?.launches && data.launches.map(({date_utc, flight_number, name, rocket, success, webcast, id})=>{
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
          page={data?.page ?? 0} 
          totalPages={data?.totalPages ?? 0} 
          hasNext={data?.hasNext ?? false} 
          hasPrev={data?.hasPrev ?? false} 
        />
        </div>
      </div>
  </div>)
}