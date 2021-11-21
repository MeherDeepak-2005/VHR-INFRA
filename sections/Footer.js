import Link from 'next/link';
import {
  GridItem,
  SimpleGrid,
  ListItem,
  List,
  Heading,
  Button,
  Text
} from '@chakra-ui/react';
import { MdEmail , MdCall } from "react-icons/md"



function FooterComponent({styles}) {
  return (
    <SimpleGrid columns={[1,1,4]} rows={[3,3,0]} h='fit-content' className={styles.footer}>
      <GridItem m='auto' colSpan={1}>
        <h1 className={styles.header_h1_footer}>VHR <span className={styles.infra_footer}>Infra</span></h1>
      </GridItem>
      <GridItem m='auto' colSpan={2}>
        <div className={styles.footer_address}>
          <Heading textAlign='center' py={3} className={styles.footer_h2}>
            Address
          </Heading>
          <List cursor='pointer'>
            <ListItem _hover={{ textDecoration: 'underline' }} py={2} lineHeight={1.3} className={styles.address_list}>
              <Link passHref href='https://www.google.com/maps/dir/17.5714506,78.3500869/VHR+INFRA+Pvt.Ltd.,+36,+Senor+Valley+82+Film+Nagar+Jublihills,+opp.+sheikpet+naala,+Ambedkar+Nagar,+Film+Nagar,+Hyderabad,+Telangana+500096/@17.486388,78.2033269,11z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bcb9737a9363525:0xb4c854b5ec104855!2m2!1d78.4040644!2d17.4133257'>
                <Text display='flex'>
                  <svg style={{ transform: 'translateX(-1rem)' }} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="50px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  Senor Valley 82 Film Nagar Jublihills, opp. sheikpet naala, Ambedkar Nagar, Film Nagar, Hyderabad, Telangana 500096
                </Text>
                </Link>
            </ListItem>
          </List>
        </div>
      </GridItem>
      <GridItem mt='auto' mb='auto' m={['auto','auto','auto,0']} colSpan={1}>
        <div className={styles.footer_contact}>
          <Heading textAlign='center' w='full' m='auto' py={3}>Contact</Heading>
          <List w='full' spacing={3}>
            <SimpleGrid spacing={5} columns={[2,2,1]} rows={[1,1,2]}>
              <GridItem >
                <ListItem className={styles.contact_list}>
                  <Link passHref href='mailto:vhrconstructions99@gmail.com'>
                    <Button leftIcon={<MdEmail />} colorScheme="teal" variant="outline">
                      Email
                    </Button>
                  </Link>
                </ListItem>
              </GridItem>
              <GridItem>
                <ListItem className={styles.contact_list}>
                  <Link passHref href='tel:9010204832' >
                    <Button leftIcon={<MdCall />} colorScheme="teal" variant="outline">
                      Call us
                    </Button>
                  </Link>
                </ListItem>
              </GridItem>
            </SimpleGrid>
          </List>
        </div>
      </GridItem>
    </SimpleGrid>
  )
}

export default FooterComponent