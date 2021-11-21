import {Image} from '@chakra-ui/react';
import { Text, Heading, Box, Flex, VStack, Input,HStack } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';
import { collection, onSnapshot,where,query } from '@firebase/firestore';
import { db } from '../services/firebase';
import { modalState } from '../atoms/modalAtoms';
import { useRecoilState } from 'recoil';
import Link from 'next/link'


function Content({ styles }) {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useRecoilState(modalState);

  useEffect(() => {
    onSnapshot(query(collection(db, 'projects'), where('projectName', '>=', search)), snapshot => {
      setProjects(snapshot.docs)
    })
  }, [search])

  const handleSearch = (e) => {
    setValue(e.target.value)
    setSearch(e.target.value)
  }


  return (
    <>
      <div className={styles.recentProjects}>
        <Heading fontWeight={['bold','semibold','thin']} fontSize={['2xl','4xl','6xl']} py={10}>Recent Projects</Heading>
      </div>
      <div>
        <Flex>
          <HStack m={['auto','auto','0rem 6rem 0rem auto']}>
            <Input value={value} onChange={(e) => { handleSearch(e) }} w='20rem' h='4rem' placeholder='Search' variant='filled' mb={3} fontSize='xl'/>
            <SearchIcon transform='translateY(-3px)' fontSize='1.7rem'/>
          </HStack>
        </Flex>
      </div>
      <Flex direction='row' flexWrap='wrap'>
        {projects.map(project => (
          <Link key={project.id} passHref href={project.data().file}>
            <Box overflow='hidden' bg='gray.50' w='40rem' m='auto' mb='1rem' py={10} px={10}>
              <Image w='40rem' h='20rem' onLoad={()=>{setOpen(false)}} transition='all .5s ease-in' _hover={{ transform: 'scale(1.1)' }} borderRadius={10} src={project.data().image} alt="VHR Infra's Project" />
              <VStack>
                <Text fontSize='3xl' py={6}>{project.data().projectName}</Text>
                <Link passHref href={project.data().projectMaps || "https://maps.google.com"}>
                  <Flex _hover={{ textDecoration: 'underline' }} alignItems='center' py={0}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    <Text cursor='pointer' fontSize='xl'>{project.data().projectLocation}</Text>
                  </Flex>
                </Link>
              </VStack>
            </Box>
          </Link>
        ))}
      </Flex>
    </>
  )
}

export default Content

