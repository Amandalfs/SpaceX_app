import { useSearchParams } from "react-router";

const Navigation = ({page, totalPages, hasNext, hasPrev}: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}) => {
    const [, setSearchParams] = useSearchParams();

    const firstPage = () => {
        setSearchParams((params) => {
            params.set("page", '1');
            return params;
        });
    };
        
    const lastPage = () => {
        setSearchParams((params) => {
            params.set("page", String(totalPages))
            return params
        })
    };

        
    const nextPage = () => {
        setSearchParams((params) => {
            if(!hasNext) return params
            const newPage = page + 1
            params.set("page", String(newPage))

            return params
        })
    };

    const previusPage = () => {
        setSearchParams((params) => {
            if(!hasPrev) return params
            const newPage = page - 1
            params.set("page", String(newPage))
            
            return params
        });
      };

    return (
        <nav className='flex row text-right justify-end md:w-[90%]'>
            <div className='flex flex-row gap-1 m-2'>
                {(page !== 1) && (1 !== page-1) && 
                    <button className='flex bg-violet-700 h-8 w-8 rounded-lg items-center justify-center text-white'
                    onClick={firstPage}
                    about="Primeira página"
                >
                    {1}   
                </button>}

                {hasPrev && <button 
                    className='flex bg-violet-700 h-8 w-8 rounded-lg items-center justify-center text-white'
                    onClick={previusPage}
                    about="Página anterior"
                >
                    {page && (page - 1)}   
                </button>}
                

                <button 
                    className='flex border-1 border-violet-700 bg-backgroundPrimary h-8 w-8 rounded-lg items-center justify-center text-violet-700 text-card-foreground shadow' 
                    disabled
                    about="Página atual"
                >
                   {Number(page)}          
                </button>
                {hasNext && <><button className='flex bg-violet-700 h-8 w-8 rounded-lg items-center justify-center text-white'
                    onClick={nextPage}
                >
                    {page && (page + 1)}          
                </button>
                <button className='flex h-8 w-8 rounded-lg items-center justify-center bg-violet-700 text-white '>
                    ...          
                </button>
                <button className='flex bg-violet-700 h-8 w-8 rounded-lg items-center justify-center text-white'
                    onClick={lastPage}
                    about="Última página"
                >
                    {totalPages}
                </button></>}
            </div>
        </nav>
    );
}

export default Navigation;