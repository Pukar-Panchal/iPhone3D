import { appleImg, bagImg, searchImg } from '../utils/index'
import {navLists} from '../constants/index'
const Navbar = () => {
    return (
        <header className='w-full flex justify-between items-center py-5 px-5 sm:px-10 bg-black'>
            <nav className='flex screen-max-width w-full'>
                <img src={appleImg} alt='apple' height={18} width={14} />
                <div className='flex w-full h-full max-sm:hidden justify-center'>
                    {navLists.map((nav) => (
                        <div key={nav} className='px-5 text-sm cursor-pointer hover:text-white transition-all'>
                            {nav}
                        </div>
                    ))}
                </div>

                <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                    <img src={searchImg} alt="search" height={18} width={18} />
                    <img src={bagImg} alt="bag" height={18} width={18} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar