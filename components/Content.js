import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from 'next/image'
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { db } from "../firebase";
import {useSession} from 'next-auth/client'
import firebase from 'firebase';

function Content() {
    const[session]=useSession()
    const[showModel, setShowModel] = useState(false);
    const[input, setInput] = useState("");
    
    const createDocument=()=>{
        if(!input) return 

        db.collection('userDocs').doc(session.user.email)
        .collection('docs').add({
           fileName : input,
           timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
        setShowModel(false);
    }
    const modal =(
        <Modal
        size="sm"
        active={showModel}
        toggler={()=>setShowModel(false)}
        >
          <ModalBody>
              <input
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                type="text"
                className="outline-none w-full"
                placeholder="Enter  name of document.."
                onKeyDown={(e)=>e.key==="Enter" && createDocument()}
              />
          </ModalBody>
          <ModalFooter>
                 <Button
                    color="blue"
                    buttonType="link"
                    onClick={(e)=>setShowModel(false)}
                    ripple="dark"
                 >
                    cancel
                 </Button>

                 <Button
                    color="blue"
                    onClick={createDocument}
                    ripple="light"
                 >
                    create
                 </Button>
             </ModalFooter> 
        </Modal>
    )
    return (
           <div className="max-w-3xl m-auto ">
               <div className="flex items-center justify-between py-6">
                  <div className="text-gray-700 text-lg">Start new document</div>
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
               <div>
                   <div onClick={()=>setShowModel(true)}
                   className="relative h-52 w-40 border-2 cursor-pointer
                                 hover:border-blue-400">
                        <Image
                        src="https://links.papareact.com/pju"
                        layout="fill"
                        />
                   </div>
                   <p className="ml-2 mt-2 text-gray-700 
                   text-sm font-semibold">Blank</p>
                   
               </div>
               {modal}
           </div>
       
    )
}

export default Content
