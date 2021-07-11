import Icon from "@material-tailwind/react/Icon";
import {useCollectionOnce} from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import {useSession} from 'next-auth/client'
import DocsRow from '../components/DocsRow'


function DocsList({docs}) {
   
   const [session] = useSession()
   const [snapShot] = useCollectionOnce(
         db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .orderBy('timestamp', 'desc')
         ) 
     const docRowHandler=()=>{
        if(snapShot){
          return snapShot?.docs.map(doc=>(
                    <DocsRow 
                    key={doc.id}
                    id={doc.id}
                    fileName={doc.data().fileName}
                    timestamp={doc.data().timestamp}
                    />
             ))
         }
         else{
            return docs.map(doc=>(
                    <DocsRow 
                    key={doc.id}
                    id={doc.id}
                    fileName={doc.fileName}
                    timestamp={doc.timestamp}
                    />
         ))
         }  
     }
      
         
    return (
        <div className="max-w-3xl m-auto py-6">
            <div className="flex items-center justify-between pb-5 text-sm 
            text-gray-700">
                <h1 className="font-medium flex-grow">My Document</h1>
                <p className="mr-12">Created on</p>
                <Icon name="folder" size="3xl" color="gray"/>
            </div>

            {
              docRowHandler()   
            }
            
        </div>
    )
}

export default DocsList
