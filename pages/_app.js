import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head';
import {Provider} from 'next-auth/client'
import '../styles.css'
function MyApp({ Component, pageProps }) {
 return (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Head>
    <Provider session={pageProps.session}>
       <Component {...pageProps} />
    </Provider>
  </>
 )
}
//https://github.com/muralikollati/google-docs-clone.git
//vscode://vscode.github-authentication/did-authenticate?windowid=1&code=24c361acd1b29d6efeca&state=28067b8f-a3c6-4540-92fe-3b1f2dbcb8bd
export default MyApp
