import { db, storage } from '../services/firebase';
import { addDoc,collection,doc,updateDoc,serverTimestamp } from '@firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import router from 'next/router';
import parseCookies from '../services/parseCookies';
import Password from '../services/password';
import {
  Heading,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex
} from '@chakra-ui/react';


function Project({ authenticationStatus }) {

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locationUrl, setLocationUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const [uploadImageStatus, setuploadImageStatus] = useState('Upload Image');
  const [uploadBrochureStatus, setuploadBrochureStatus] = useState('Upload Brochure');



  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();


  const uploadFile = async () => {
    const docRef = await addDoc(collection(db, 'projects'), {
      image: '',
      file: '',
      projectName: name,
      projectLocation: location,
      projectMaps: locationUrl,
      timestamp: serverTimestamp
    })
    const imageRef = ref(storage, `files/${name}/${image.name}`)
    const pdfRef = ref(storage, `files/${name}/${file.name}`)
    
    await uploadBytesResumable(imageRef, image).then(
      async snapshot => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'projects', docRef.id), {
          image: downloadUrl,

        })

    });
    await uploadBytesResumable(pdfRef, file).then(
      async snapshot => {
        const downloadUrl = await getDownloadURL(pdfRef);
        await updateDoc(doc(db, 'projects', docRef.id), {
          file: downloadUrl,
          projectName: name,
          projectLocation: location,
          projectMaps: locationUrl,
          timestamp: serverTimestamp
        })
      });
  }

  const exampleForMaps = 'https://www.google.com/maps/place/Meher+valley/@17.5502021,78.3707233,15z/data=!4m5!3m4!1s0x3bcb8df0f4232109:0xe6029f3c5efba620!8m2!3d17.5601751!4d78.3609184'

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
    setuploadImageStatus('Image Uploaded')
  }
   const handleFileUpload = (e) => {
      setFile(e.target.files[0])
      setuploadBrochureStatus('Image Uploaded')
  }

  const onSubmit = (e) => {
    setName(e.name)
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await uploadFile();
    router.push('/')
  }

  if (!authenticationStatus.authenticated) {
    return (
      <Password/>
    )
  }
  else {
    return (
      <form onSubmit={
        handleSubmit(onSubmit),
        handleFileSubmit
      }>
        <VStack w='full' h='full' p={10} spacing={10}>
          <Heading fontSize={['4xl', '6xl', '8xl']} fontWeight='ultrathin'>Upload new project</Heading>
          <Text w={['60%', '100%']} textAlign='center' fontSize={['xs', 'xl']}>Fill the details and choose the required image and file to uplaod the project</Text>
        </VStack>
        <SimpleGrid rowGap={10} columnGap={10} w='50%' m='auto' py={10} columns={[1, 1, 2]} rows={[1, 1, 2]}>
          <GridItem rowSpan={1}>
            <FormControl>
              <FormLabel htmlFor='projectName'>Project Name</FormLabel>
              <Input onChange={(e) => { setName(e.target.value) }} required size='lg' id='projectName' placeholder='Meher Valley' />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor='Location'>Location</FormLabel>
              <Input onChange={(e) => { setLocation(e.target.value) }} required size='lg' id='Location' placeholder='Mallampet, Hyderabad' />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor='Location'>Google Maps Link</FormLabel>
              <Input onChange={(e) => { setLocationUrl(e.target.value) }} required size='lg' id='Location' placeholder={exampleForMaps} />
            </FormControl>
          </GridItem>
        </SimpleGrid>
        <SimpleGrid w='50%' m='auto' columns={[1, 1, 2]} rows={[2, 2, 1]}>
          <GridItem>
            <FormControl>
              <FormLabel py={[1, 5]} borderRadius={5} bg='teal.400' w='80%' m='auto' cursor='pointer' htmlFor='imageFile'>
                <Flex direction='row' justifyContent='space-evenly' alignItems='center'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" /></svg>
                  <Text fontSize='xl'>{uploadImageStatus}</Text>
                </Flex>
              </FormLabel>
              <Input accept='image/png, image/jpg, image/jpeg, image/webp, image/HEIC' onChange={handleImageUpload} required id='imageFile' type='file' hidden />
            </FormControl>
          </GridItem>
          <GridItem mt={['10', '0']}>
            <FormControl>
              <FormLabel py={[1, 5]} borderRadius={5} bg='teal.400' w='80%' m='auto' cursor='pointer' htmlFor='Brochure'>
                <Flex direction='row' justifyContent='space-evenly' alignItems='center'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" /></svg>
                  <Text fontSize='xl'>{uploadBrochureStatus}</Text>
                </Flex>
              </FormLabel>
              <Input accept='application/pdf' required onChange={handleFileUpload} id='Brochure' type='file' hidden />
            </FormControl>
          </GridItem>
        </SimpleGrid>
        <Box py={20} display='flex'>
          <Button m='auto' py={8} px={10} colorScheme='teal' size='lg' textTransform='uppercase' variant='outline' isLoading={loading} type="submit">
            <Text fontSize='2xl'>Submit</Text>
          </Button>
        </Box>
      </form>
    )
  }
}


export default Project

Project.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  cookies.authenticated
  return {
    authenticationStatus: cookies
  };
}