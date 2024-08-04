'use client'

import BackgroundComponent from "@/components/BackgroundComponent";
import CameraComponent from "@/components/CameraComponent";
import Gallery from "@/components/Gallery";
import PantryGallery from "@/components/PantryGallery";
import Title from "@/components/Title";
import { LampContainer, LampDemo } from "@/components/ui/Lamp";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Box, Button, Container } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

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


    <Container className="flex max-w-full h-screen pb-20  flex-col bg-slate-950 w-screen items-center justify-between overflow-x-hidden ">
      {/* <BackgroundComponent /> */}

      <div className="flex self-end gap-6 md:top-2 md:right-10 z-90 items-center mt-8 ">
        {/* <WelcomeMessage firstName={firstName} lastName={lastName} className="text-2xl p-2 mt-10 font-semibold" /> */}
        <span className="text-xs sm:text-2xl md:text-2xl p-2 font-semibold z-50"> Welcome {' '}
          <span className="text-cyan-500">
            {firstName.toUpperCase()} {''} {lastName.toUpperCase()}
          </span>
        </span>
        <Button variant="outlined" className="z-50 sm:w-20 w-12 px-1 text-xs md:text-base md:w-20 md:h-8  font-bold text-cyan-500 hover:text-white border-white" onClick={() => signOut()}>Logout</Button>

      </div>

      <Box className="flex flex-col justify-center items-center mt-60">

        <LampDemo />

        <Gallery />


      </Box>

    </Container>


  );
}
