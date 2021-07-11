import Button from '@material-tailwind/react/Button'
import Image from 'next/image'
import {signIn} from 'next-auth/client'

function Login() {
    return (
        <div className="flex flex-col items-center justify-center
         min-h-screen py-2">
           <Image
           src="https://links.papareact.com/1ui"
           width="550"
           height="300"
           objectFit="contain"
           />
           <Button
                className="w-44 mt-5"
                buttonType="filled"
                ripple="light"
                onClick={signIn}
                color="blue"
           >
               Login
            </Button>
        </div>
    )
}

export default Login
