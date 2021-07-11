import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertToRaw, EditorState, convertFromRaw} from 'draft-js';
import {useState, useEffect} from 'react';
import { db } from '../firebase';
import {useRouter} from 'next/dist/client/router';
import {useSession} from 'next-auth/client'
import {useDocumentOnce} from 'react-firebase-hooks/firestore'

const Editor = dynamic(
    ()=>import('react-draft-wysiwyg').then((module)=>module.Editor),
    {
        ssr:false,
    }
);

const TextEditor = ({doc}) => {
    console.log("docTe", doc)
    const router = useRouter();
    const [session] = useSession()
    const {id} = router.query;
    const[editorState, setEditorState]= useState(EditorState.createEmpty())
    

    
    useEffect(() => {
        if(doc){
            setEditorState(EditorState.createWithContent(
                convertFromRaw(doc)
            ))
        }
    },[])
    const onEditorStateChange=(editorState)=>{
        setEditorState(editorState);

        db
        .collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
         },{
            merge:true
           }
        )
    }
    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50
                                    !justify-center mx-auto"
                editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto
                                mb-12 border "
            />
        </div>
    )
}

export default TextEditor
