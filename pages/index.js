import Head from 'next/head'
import Content from '../components/Content'
import Header from '../components/Header'
import DocsList from '../components/DocsList'
import Login from '../components/Login'
import {useSession, getSession} from 'next-auth/client'
import {db} from '../firebase'

export default function Home({docs}) {
  const [session] = useSession()
  if(!session) return <Login/>
  return (
    <div>
      <Head>
        <title>Google docs clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/> 
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <Content/>
      </section>
      
      <section className="bg-white px-10 md:px-0">
        <DocsList docs={docs}/>
      </section>

    </div>
  )
}


export async function getServerSideProps(context){
    const session = await getSession(context)

  const docList = await db
                  .collection('userDocs')
                  .doc(session?.user?.email)
                  .collection('docs')
                  .orderBy('timestamp', 'desc').get()


     const docs =  docList?.docs.map(doc =>({
       id : doc.id,
       ...doc.data(),
       timestamp: null
     }))
      //console.log("docList ",docList?.data());
return{
    props:{
        session,
        docs
    }
}
}
