import Image from 'next/image';
import router from 'next/router';
import { Heading,Button,Text,Box,HStack } from '@chakra-ui/react';



function HeaderComponent({ styles }) {

  const handleRoute = (url) => {
    router.push(url)
  }

  return (
    <Box w='full' className={styles.header}>
      <h1 className={styles.header_h1}>
        <HStack alignItems={['flex-end','center','center']} >
          <Heading as='h1' fontSize={['6rem','6rem','8rem']}>VHR</Heading>
          <Text transform={['translateY(-5px)','translateY(0)','translateY(1.3rem)']} fontWeight='bold' fontSize={['4xl','3xl','7xl']}>Infra</Text>
        </HStack>
      </h1>
      <Button m='10' px={['5','10']} py='8' bg='yellow.200' borderRadius='2xl' size='lg' _hover={{ backgroundColor:'yellow.300',transform: 'scale(1.05)' }}>
        <Text fontSize='2xl' color='gray.800'>&#43; View Projects</Text>
      </Button>
      <Box display={['none']} className={styles.navigation}>
          <Image alt='Home Icon' src="/home-page.png" height='23' width='23' />
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M22 20L20 22 14 16 14 14 16 14z"/><path fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="2" d="M9 3A6 6 0 1 0 9 15A6 6 0 1 0 9 3Z"/><path fill="none" stroke="#000000" strokeMiterlimit="10" d="M13 13L15.5 15.5"/></svg>
          <Image onClick={
            () => {
              handleRoute('/content')
            }
          } alt='Home Icon' src="/plus.png" height='23' width='23' />
          <Image src="https://img.icons8.com/ios-glyphs/30/000000/about.png" alt='about icon' height='23' width='23'/>
      </Box>
    </Box>
  )
}

export default HeaderComponent
