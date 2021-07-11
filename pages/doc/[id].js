import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import {useRouter} from 'next/dist/client/router'
import {useDocumentOnce} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import {signOut, getSession, useSession} from 'next-auth/client' 
import Login from '../../components/Login'
import TextEditor from '../../components/TextEditor'

const Doc =({doc, fileName})=> {
   
    const[session]= useSession();
    if(!session) return <Login/>

    const router = useRouter();
    const {id} = router.query

    const[snapShot, loadingSnapShot] = useDocumentOnce(
        db
         .collection('userDocs')
         .doc(session.user.email)
         .collection('docs')
         .doc(id)
    )
    // redirect if user tries to access a URL  they do not have access to..
    if(!loadingSnapShot && !snapShot?.data()?.fileName){
        router.replace('/')
    }
    return (
        <div>
            <header className="flex items-center justify-between p-3 pb-1">
                <span className="" onClick={()=>router.push('/')}>
                  <Icon name="description" color="blue" size="5xl"/>
                </span>
                <div className="flex-grow px-2">
                    <h1 className="">{fileName}</h1>
                    <div className="flex items-center text-sm space-x-1
                    -ml-1 h-8 text-gray-700">
                        <p className="options">File</p>
                        <p className="options">Edit</p>
                        <p className="options">View</p>
                        <p className="options">Insert</p>
                        <p className="options">Format</p>
                        <p className="options">Tools</p>
                    </div>
                </div>
                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="hidden md:inline-flex h-10"
                >
                <Icon 
                    name="people" 
                    size="3xl"
                />Share
                </Button> 
                <img
                loading="lazy"
                className="cursor-pointer h-10 w-10 rounded-full ml-2"
                src={session?.user?.image}
                alt=""
                />
            </header>
            <TextEditor doc={doc}/>
        </div> 
    )
}

export default Doc

export async function getServerSideProps(context){
    const session = await getSession(context);
    const {id} =context.query
   
    const docData = await db.collection('userDocs')
                            .doc(session.user.email)
                            .collection('docs')
                            .doc(id).get()
    
   
    // const doc =  docData?..map(a=>(
    //     console.log("doc")
    // ))
   
    const doc = docData?.data()?.editorState
    const fileName = docData?.data()?.fileName
    return{
        props:{
            session,
            doc,
            fileName
        }
    }
}
