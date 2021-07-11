import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import {useRouter} from 'next/dist/client/router'

function DocsRow({id, fileName, timestamp}) {
    const router =useRouter()
    return (
        <div onClick={()=>router.push(`/doc/${id}`)}
              className="flex items-center p-4 rounded-lg
              hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon 
            name="article" 
            size="3xl" 
            color="blue"
            />
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}
            </p>
            <p className="pr-5 text-sm" >{(timestamp) ? 
                                            timestamp?.toDate().toLocaleDateString()
                                             : 
                                             "loading..."
                                             }
            </p>
            <Button
                color="grey"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="border-0"
            >
            <Icon 
                name="more_vert" 
                size="3xl"
                color="grey"
            />
            </Button>  
        </div>
    )
} 

export default DocsRow
