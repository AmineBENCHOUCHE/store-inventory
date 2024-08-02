'use client'

import BackgroundComponent from "@/components/BackgroundComponent";
import CameraComponent from "@/components/CameraComponent";
import CustomModal from "@/components/CustomModal";
import PantryGallery from "@/components/PantryGallery";
import SearchComponent from "@/components/SearchComponent";
import Title from "@/components/Title";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Box, Button, Container } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { TbPhotoSensor3 } from "react-icons/tb";




export default function Home() {
  const session = useSession();
  const fullName = session?.data?.user?.name;
  const fullNameFormatted = fullName?.split(" ").map((str => str.charAt(0).toUpperCase() + str.slice(1))).join(" ") || ''
  const firstName = fullNameFormatted?.split(" ")[0] || 'Guest';
  const lastName = fullNameFormatted?.split(" ")[1] || '';
  // let  isTitleAnimation = false

  // setTimeout((isTitleAnimation:boolean) => {

  //    isTitleAnimation = true
  // }, 3000);;

  return (


    <Container className="flex flex-col mt-0 items-center justify-between ">
        <BackgroundComponent />
        <div className="flex justify-center items-center">
          <WelcomeMessage firstName={firstName} lastName={lastName} className="text-2xl p-2 mt-10 font-semibold" />
          <Button variant="outlined" className="z-50 w-40 h-20 text-2xl font-bold border-white" onClick={() => signOut()}>Logout</Button>
        </div>
        {<Title />}
        <CameraComponent />
        <Box
          width="100%"
          height="100%"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={"center"}
          gap={6}
        >
          <PantryGallery />
          <CustomModal />
        </Box>
      </Container>
 

  );
}
