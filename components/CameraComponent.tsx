"use client"

import React, { useState, useRef, useEffect } from "react";
import { TbPhotoSensor3 } from "react-icons/tb";
import { AiFillOpenAI } from "react-icons/ai";

const CameraComponent = ({ isDemo }: { isDemo: boolean }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);


  const [hasPhoto, setHasPhoto] = useState(false);

  const [labelList, setLabelList] = useState<string[]>(["-hero", "-new", "-cancel"]);

 
  const canvasWidth = 414;
  const canvasHeight = canvasWidth / (16 / 9);

  const takePicture = () => {

    let video = videoRef.current;
    const canvas = photoRef.current;

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

  const canvas = photoRef.current;

  const handleAddItemDemo = async () => {

    // transform image to base64
    const imageData = photoRef.current?.toDataURL('image/png')
    // Make the request to the api endpoint
    const req = await fetch('/api/image-caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });
    const response = await req.json()

    console.log("content", response)
    if (response) {

      setLabelList(response.content.split("\n"));
    }
    return labelList;
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
    <div className="w-[100%] h-full sm:mt-2 mt-28 flex flex-col  justify-center items-center ">
      
   


      {isDemo && <div className="flex w-full justify-center items-center ">
        {
          <video ref={videoRef} className="h-auto w-[50vw] max-w-[50vw] mt-20 mb-5 z-90 rounded-full">
          </video>
        }
      </div>
      }
      {isDemo && 
      <div className="flex flex-col items-center ">
        <TbPhotoSensor3 cursor={'pointer'} size={150} className="" onClick={takePicture} />
        <span>Take a picture</span>
      </div>
      }

      <div className={`${hasPhoto && "mt-10 w-full flex flex-col items-center  text-2xl "}`}>
        {hasPhoto && <canvas ref={photoRef} className="w-[50vw] max-w-[50vw] h-auto border border-x-8 border-y-8  z-50"/>}

        {hasPhoto &&
        

            <button
              onClick={handleAddItemDemo}
              className="mt-10 mb-10 relative z-50 inline-flex w-fit h-24  overflow-hidden rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5  text-base md:text-2xl  font-medium text-white backdrop-blur-3xl gap-2">
                Analyse Image
                <AiFillOpenAI size={32} />
              </span>
            </button>
         
        }
      </div>
    </div>

    

  )
}

export default CameraComponent;