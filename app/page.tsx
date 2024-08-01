
import BackgroundComponent from "@/components/BackgroundComponent";
import CameraComponent from "@/components/CameraComponent";
import CustomModal from "@/components/CustomModal";
import PantryGallery from "@/components/PantryGallery";
import Title from "@/components/Title";
import { Box, Container } from "@mui/material";
import { TbPhotoSensor3 } from "react-icons/tb";




export default function Home() {
  return (


    <Container className="flex min-h-screen flex-col mt-0 items-center justify-between ">
      <Title/>
      <TbPhotoSensor3 cursor={'pointer'} size={200}/>
      {/* <CameraComponent /> */}
     
      <BackgroundComponent />


      <Box
        width="100%"
        height="100%"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={"center"}
        gap={4}
        


      >
        <CustomModal />
        <PantryGallery />

      </Box>
    </Container>

  );
}
