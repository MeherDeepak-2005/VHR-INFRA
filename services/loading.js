import { Flex } from '@chakra-ui/react';
import { PushSpinner } from "react-spinners-kit";

function loading() {
  return (
    <Flex direction='column' justify='space-evenly' h='100vh' zIndex='100' alignItems='center'>
      <svg xmlns="http://www.w3.org/2000/svg" width="302" height="293" viewBox="0 0 302 293">
        <g id="Group_3" data-name="Group 3" transform="translate(-816 -269)">
        <ellipse id="Ellipse_15" data-name="Ellipse 15" cx="151" cy="146.5" rx="151" ry="146.5" transform="translate(816 269)" fill="#4d5567"/>
        <text id="VHR" transform="translate(886 445)" fill="#ced6e0" fontSize="80" fontFamily="PingFangHK-Semibold, PingFang HK" fontWeight="600"><tspan x="0" y="0">VHR</tspan></text>
        </g>
      </svg>
      <PushSpinner size={30} color="#686769" loading={loading} />;
    </Flex>
  )
}

export default loading
