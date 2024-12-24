import { Line } from './Line';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getByListLaunches } from '../../services/request';
import Navigation from './Navigation/Navigation';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function HistoryLaunches(){
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["launches", page, search],
    queryFn: async () => {
      const response = await getByListLaunches(search, page);
      return response;
    }
  });

  return (<section className='flex flex-col justify-center gap-8 '>
    <div className='flex justify-center'>
      <h2 className='text-2xl text-primary font-bold'>
        Registros de lançamentos
      </h2>
    </div>
    <div className='flex justify-center items-center'>
      <form className='flex flex-row gap-4 items-center w-[1216px] h-14 mx-auto'
      onSubmit={(e)=>{
        e.preventDefault();
        setSearchParams((params) => {
          params.set("page", '1');
          return params;
        });
        setSearch(valueSearch);
      }}>
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
            setSearchParams((params) => {
              params.set("page", '1');
              return params;
            });
            setSearch(valueSearch);
          }}
          type='button'
        >Pesquisar</Button>
      </form>
    </div>

    <Card className='w-[1216px] h-[90%] mx-auto mb-8'>
      <CardContent>       
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-8 text-center text-primary">
                  Nº Voo
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Logo
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Missão
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Data de lançamento
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Foguete
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Resultado
                </TableHead>
                <TableHead className="px-8 text-center text-primary">
                  Vídeo
                </TableHead>
              </TableRow>
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
              {
                isLoading  && (Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton className='w-full rounded-lg h-8'/>
                  </TableCell>
                </TableRow>
              )))
              }
            </TableBody>
            <TableFooter>
              <TableRow className="text-right">
                <TableCell colSpan={7}>
                  <Navigation 
                    page={data?.page ?? 0} 
                    totalPages={data?.totalPages ?? 0} 
                    hasNext={data?.hasNext ?? false} 
                    hasPrev={data?.hasPrev ?? false} 
                    />
                  </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
      </CardContent>
    </Card>
  </section>)
}