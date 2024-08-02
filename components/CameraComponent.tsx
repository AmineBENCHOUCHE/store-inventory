"use client"
import analyzeImage from "@/image-caption";
import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
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
  const handleAddItemDemo = (canvas: HTMLCanvasElement) => {
    //return analyzeImage(canvas);
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
    <div className="w-[100%] h-auto relative flex flex-col  justify-center items-center ">
      {!demo && <Button variant="outlined" className="text-white border-white w-50 h-20 border p-10 mb-10" onClick={handleDemo}>Try it Now</Button>}

      {demo && <div className="flex justify-center items-center">
        {
          <video ref={videoRef} className="border w-full h-auto border-20 z-50">
          </video>
        }
      </div>
      }
      {demo && <TbPhotoSensor3 cursor={'pointer'} size={150} className="" onClick={takePicture} />}

      <div className={`${hasPhoto && "w-full flex flex-col items-center gap-4  text-2xl h-100"}`}>
        <canvas ref={photoRef} className="w-full h-auto z-50">

        </canvas>
        {hasPhoto &&

          <button
            // onClick={handleAddItemDemo(canvas)}
            className="mb-10 relative inline-flex w-[20rem] h-24  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-2xl font-medium text-white backdrop-blur-3xl">
              Add Item
            </span>
          </button>
        }

        {/* <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button> */}
        {/* <img src={image} alt='Taken photo' />
            <p>
              {analyzeImage(image)};
            </p> */}

      </div>
    </div>
  )
}

export default CameraComponent;