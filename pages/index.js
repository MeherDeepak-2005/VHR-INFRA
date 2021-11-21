import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HeaderContent from '../sections/Header'
import Content from '../sections/Content';
import Footer from '../sections/Footer';
import { modalState } from '../atoms/modalAtoms';
import { useRecoilState } from 'recoil';
import Loading from '../services/loading';


export default function Home() {
  const [open, setOpen] = useRecoilState(modalState);


  return (
    <>
      <Head>
        <title>VHR Infra Pvt Ltd</title>
        <meta name="description" content="VHR INFRA Pvt Ltd hyderabad construction company official website." />
        <link rel="icon" href="./Logo.jpg" />
      </Head>
      {
        open ? (
          <>
            <Loading />
            <div style={{ display:'none'}}>
              <HeaderContent styles={styles} />
              <Content styles={styles} />
              <Footer styles={styles} />
            </div>
          </>
        ) : (
            <>
              <HeaderContent styles={styles} />
              <Content styles={styles} />
              <Footer styles={styles}/>
            </>
        )
      }
    </>
  )
}
