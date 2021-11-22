import { FormControl,Text,Button } from "@chakra-ui/react"
import { Box, FormLabel, Input } from "@chakra-ui/react"
import { db } from './firebase';
import { query,onSnapshot,collection } from '@firebase/firestore';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import router from 'next/router';



function Password() {
  const [password, setPassword] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userAuthenticated, setUserAuthenticated] = useState(false);



  useEffect(() => {
    onSnapshot(query(collection(db, 'passwordList')), snapshot => {
      const data = snapshot.docs[0].data()
      setPassword(data.password);
    })
  }, [])

  const logIn = (e) => {
    e.preventDefault();
    if (password == userPassword) {
      Cookie.set('authenticated', true)
    }
    router.push('/uploadProject')
  }

  return (
    <Box bg='gray.900' w='fit-content' px={20} py={10} m='auto' mt='20rem' alignItems='center' display='flex'>
      <form onSubmit={(e)=> {logIn(e)}}>
        <FormLabel color='gray.100' fontSize='4xl' htmlFor='password'>
          Password
        </FormLabel>
        <Input color='gray.100' onChange={(e)=>{setUserPassword(e.target.value)}} mb={10} mt={2} h='5vh' id='password' type='password' placeholder='Enter Password' variant='outline' />
        <Text fontSize='lg' color='gray.100'>Input password to login and upload new projects</Text>
        <Button mx='10rem' my={10} variant='outline' textTransform='uppercase' type='submit' py={7} px={10} colorScheme='teal'>
          Log In
        </Button>
      </form>
    </Box>
  )
}

export default Password
