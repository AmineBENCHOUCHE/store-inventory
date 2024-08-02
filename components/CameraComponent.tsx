"use client"
import analyzeImage from "@/image-caption";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { TbPhotoSensor3 } from "react-icons/tb";

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  
  const [hasPhoto, setHasPhoto] = useState(false);
  const [demo, setDemo] = useState(false);

  const [image, setImage] = useState<string>("");
  const [item, setItem] = useState<string>("")

  const handleDemo = () => {
    setDemo(true);
  }
  const canvasWidth = 414;
  const canvasHeight = canvasWidth / (16 / 9);

  const takePicture = () => {
    
    let video = videoRef.current;
    const canvas  = photoRef.current;

   if (canvas) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');
        if (ctx && videoRef.current) {
            ctx.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
        }
    }
    setHasPhoto(true);
  }

  const handleAddItemDemo = ()=>{
    //{analyzeImage(image)};
  }

  const getVideo = async () => {
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1980, height: 1080 },
      });

      const video = videoRef.current; // Make sure cameraRef is valid

      if (video) {
        video.srcObject = stream;
        await video.play();
      }
    } catch (error) {
      console.error('Error accessing media stream:', error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);


  return (
    <div className="w-[100%] h-auto relative flex flex-col  justify-center items-center border border-10 border-red-500 mb-10">
      {!demo && <button className="w-50 h-50 border p-10 mb-10" onClick={handleDemo}>Try it</button>}
      {demo && <div className="flex justify-center items-center">
        { 
        <video ref={videoRef} className="border w-full h-auto border-20 z-50">
        </video>
        }
      </div>
      }
      {<TbPhotoSensor3 cursor={'pointer'} size={150} className="" onClick={takePicture} />}

      <div className={`${hasPhoto && "w-full h-100"}`}>
        <canvas ref={photoRef} className="border w-full h-auto border-20 z-50">

        </canvas>
        {hasPhoto && <button className="w-50 h-50 border p-10 mb-10" onClick={handleAddItemDemo}>Add Item</button>}
      </div>

      {/* <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button> */}
      {/* <img src={image} alt='Taken photo' />
      <p>
        {analyzeImage(image)};
      </p> */}
    </div>
  );
}

export default CameraComponent;