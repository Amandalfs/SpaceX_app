import rocket from "@/assets/rocket.png";

export function Header(){
    return (<header className="flex w-full gap-2  h-20 justify-center items-center py-4">
        <img className="w-10 h-10 md:w-12 md:h-12" src={rocket} alt="" />
        <h1 className="font-sans  font-bold text-3xl text-primary md:text-5xl">SpaceX</h1>
    </header>)
}