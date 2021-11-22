import {Image} from '@chakra-ui/react';
import { Text, Box, Flex, VStack, Input,HStack } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';
import { collection, getDocs,onSnapshot,where,query, getDoc } from '@firebase/firestore';
import { db } from '../services/firebase';
import Link from 'next/link'


function Projects({ fetchedProjects }) {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState();
  const [searchStatus, setStatus] = useState(false);
  const [projects, setProjects] = useState([]);
  const [allowSearchDisplay, setAllowSearchDisplay] = useState(false);


  useEffect(() => {
    if (!searchStatus) {
      setProjects(JSON.parse(fetchedProjects))
    }
    else {
      onSnapshot(query(collection(db, 'projects'), where('projectName', '>=', search)), snapshot => {
        setProjects(snapshot.docs)
        setAllowSearchDisplay(true)
      })
    }
    }, [searchStatus,search,fetchedProjects]
  )




  const handleSearch = (e) => {
    setValue(e.target.value)
    setSearch(e.target.value)
    setStatus(true)
  }

  if (allowSearchDisplay) {
    return (
      <>
        <div style={{marginTop:'4rem'}}>
          <Flex>
            <HStack m={['auto', 'auto', '0rem 6rem 0rem auto']}>
              <Input value={value} onChange={(e) => { handleSearch(e) }} w='20rem' h='4rem' placeholder='Search' variant='filled' mb={3} fontSize='xl' />
              <SearchIcon transform='translateY(-3px)' fontSize='1.7rem' />
            </HStack>
          </Flex>
        </div>
        <Flex direction='row' flexWrap='wrap'>
          {projects.map(project => (
            <Link key={project.data().file} passHref href={project.data().file || 'https://google.com/maps'}>
              <Box overflow='hidden' bg='gray.50' w='40rem' m='1rem' py={10} px={10}>
                <Image w='40rem' h='20rem' transition='all .5s ease-in' _hover={{ transform: 'scale(1.1)' }} borderRadius={10} src={project.data().image || 'images.unsplash.com'} alt="VHR Infra's Project" />
                <VStack>
                  <Text fontSize='3xl' py={6}>{project.data().projectName}</Text>
                  <Link passHref href={project.projectMaps || "https://maps.google.com"}>
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
  else {
    return (
      <>
        <div style={{marginTop: '4rem'}}>
          <Flex>
            <HStack m={['auto', 'auto', '0rem 6rem 0rem auto']}>
              <Input value={value} onChange={(e) => { handleSearch(e) }} w='20rem' h='4rem' placeholder='Search' variant='filled' mb={3} fontSize='xl' />
              <SearchIcon transform='translateY(-3px)' fontSize='1.7rem' />
            </HStack>
          </Flex>
        </div>
        <Flex direction='row' flexWrap='wrap'>
          {projects.map(project => (
            <Link key={project.file} passHref href={project.file}>
              <Box overflow='hidden' bg='gray.50' w='40rem' m='1rem' py={10} px={10}>
                <Image w='40rem' h='20rem' transition='all .5s ease-in' _hover={{ transform: 'scale(1.1)' }} borderRadius={10} src={project.image} alt="VHR Infra's Project" />
                <VStack>
                  <Text fontSize='3xl' py={6}>{project.projectName}</Text>
                  <Link passHref href={project.projectMaps || "https://maps.google.com"}>
                    <Flex _hover={{ textDecoration: 'underline' }} alignItems='center' py={0}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                      <Text cursor='pointer' fontSize='xl'>{project.projectLocation}</Text>
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
}

export default Projects

export async function getServerSideProps() {
  const snapshot = await getDocs(query(collection(db, 'projects')));
  const data = [];
  snapshot.docs.map((project) => {
    data.push(project.data());
  })

  return {
    props: {
      fetchedProjects: JSON.stringify(data)
    }
  }
}
