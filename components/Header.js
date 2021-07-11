import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useSession} from 'next-auth/client'
import {signOut} from 'next-auth/client'

function Header() {
   const [session]= useSession()
    return (
        <header className="sticky z-50 top-0 flex items-center
         px-2 py-2 shadow-md bg-white">
            <Button
                color="grey"
                buttonType="outline"
                size="regular"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="h-20 w-20 border-0 "
            >
            <Icon 
                name="menu" 
                size="3xl"
            />
            </Button>   
            <Icon 
                name="description" 
                size="3xl" 
                color="blue"
             />
            <h1 
            className="ml-1 text-gray-700 text-2xl">
                Docs
            </h1>

            <div className="flex flex-grow items-center px-5 py-2 bg-gray-100
             text-gray-600 rounded-2xl mx-5 md:mx-20 focus-within:shadow-md
             focus-within:text-gray-600">
                <Icon 
                    name="search" 
                    size="3xl" 
                    color="grey"
                />
                <input 
                    type="text" 
                    placeholder="search"
                    className="flex-grow  px-3 bg-transparent outline-none text-base"
                />
            </div>
            <Button
                color="grey"
                buttonType="outline"
                size="regular"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className=" md:inline-flex  md:ml-20 h-20 w-20 border-0"
            >
            <Icon 
                name="apps" 
                size="3xl"
                color="grey"
            />
            </Button> 
            <img
                loading="lazy"
                className="cursor-pointer h-12 w-12 rounded-full ml-1"
                src={session?.user?.image}
                alt=""
                onClick={signOut}
            />
        </header>
    )
}

export default Header

