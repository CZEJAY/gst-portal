import { setCurrentStep, updateFormData } from "../../../redux/slices/onboardingStudentsSlice";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import NavButtons from "@/components/FormInputs/NavButtons";
import { CLOUDINARYUPLOAD } from "@/actions";
import Image from "next/image";

interface FormData {
  // Define your form data types here
}

export default function FacialAuthentication() {
  const currentStep = useSelector((store: any) => store.onboarding.currentStep); // Adjust the type as per your RootState
  const formData = useSelector((store: any) => store.onboarding.formData); // Adjust the type as per your RootState
  console.log(formData, currentStep);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>(formData?.image || "");
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      ...formData,
    },
  });
  const dispatch = useDispatch();
  let loadingToast: string | number | undefined
  async function processData(data: FormData) {
    setLoading(true);
    try {
      if (!imageURL) {
        return toast.error("Image is required.");
      }

      if (!formData?.image) {
        loadingToast = toast.loading("Uploading image...");

        const value = await CLOUDINARYUPLOAD(imageURL)
        if (value?.data) {
          toast.success(value?.message);
          setImageURL(value?.data?.secure_url);
          const FData: FormData = { ...data, image: value?.data?.secure_url };
          dispatch(updateFormData(FData));
          dispatch(setCurrentStep(currentStep + 1));
        }
      } else {
        dispatch(setCurrentStep(currentStep + 1));
      }

      console.log(data);
    } catch (error) {
      console.log("Error occurred: ", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast)
    }
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClick = async () => {
    setImageURL("");
    const FData: FormData = { ...formData, image: "" };
    dispatch(updateFormData(FData));
    setIsCapturing(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current!.srcObject = stream;
      setMediaStream(stream);
    } catch (error) {
      toast.info("Could not access camera. Please reload!");
      console.log(error);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.pause();
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        
        const x = (canvasRef.current.width - videoWidth) / 2;
        const y = (canvasRef.current.height - videoHeight) / 2;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(videoRef.current, x, y, videoWidth, videoHeight);

        const image = canvasRef.current.toDataURL("image/png");
        setImageURL(image);

        handleCloseCamera();
        setIsCapturing(false);
      }
    }
  };

  const handleCloseCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <form className="md:px-12 py-4 min-h-[550px] flex w-full flex-col" onSubmit={handleSubmit(processData)}>
        <div className="mb-8">
          <h5 className="text-lg md:text-3xl font-bold text-gray-900">
            Facial Authentication
          </h5>
          <p className="font-semibold text-sm md:text-lg">Please look into the camera.</p>
        </div>
        <canvas ref={canvasRef} className="hidden bg-current" width={200} height={200} />
        <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-full">
          <video ref={videoRef} autoPlay className="object-cover w-full h-full transform scale-125" />
        </div>
        {/* {imageURL && (
          <Image width={200} height={200} src={imageURL} alt="CaptImage" className="h-[150px] w-[200px] mt-9 mx-auto object-cover bg-center" />
        )} */}
        <button
          onClick={isCapturing ? handleCapture : handleClick}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800"
        >
          <Camera className="w-5 h-5 mr-2" />
          <span>{isCapturing ? "Capture" : "Start Camera"}</span>
        </button>
        <NavButtons loading={loading} />
      </form>
    </>
  );
}
