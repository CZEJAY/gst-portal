"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode } from "lucide-react";
import {
  Html5QrcodeScanner,
  Html5QrcodeResult,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useEffect, useState } from "react";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";

export function ScannerModal() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerResult, setScannerResult] = useState(null);
  let config: Html5QrcodeScannerConfig = {
    qrbox: { width: 400, height: 150 },
    fps: 5,
  };

  const handleCloseCamera = async () => {
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleScan = () => {
    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(successHandler, errorHandler);
    function successHandler(success: any) {
      console.log("success");
      scanner.clear();
      console.log(success);
      setScannerResult(success);
      handleCloseCamera()
      window.open(String(success), "_blank")
    }
    function errorHandler(err: any) {
      // console.log("Error");
      // console.warn(err);
    }
  }
  
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(successHandler, errorHandler);
    function successHandler(success: any) {
      console.log("success");
      scanner.clear();
      console.log(success);
      setScannerResult(success);
      handleCloseCamera()
      window.open(String(success), "_blank")
    }
    function errorHandler(err: any) {
      // console.log("Error");
      // console.warn(err);
    }
  }, []);


  return (
    <Tabs defaultValue="scanQR" className="max-w-[600px] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="scanQR" className="text-blue-500">Scan Code</TabsTrigger>
        <TabsTrigger value="student" className="text-blue-500">Student Details</TabsTrigger>
      </TabsList>
      <TabsContent value="scanQR" className="">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center text-blue-600">
              <QrCode size={20} />
              Scan QR Code
            </CardTitle>
            <CardDescription className="text-gray-950">
              Scan the unique Students QR code from the GST main portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col border items-center justify-center w-full min-h-[350px]">
            <div className="space-y-1  mx-auto ">
              {scannerResult ? (
                <div className="text-blue-800">
                  Success:{" "}
                  <a href={scannerResult}>
                    {scannerResult}
                  </a>
                </div>
              ) : (
                <div id="reader"></div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-5">
          <Button className="bg-blue-800 hover:bg-blue-600" onClick={() => handleScan()}>Open Modal</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="student">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-400">Student&aposs Detail</CardTitle>
            <CardDescription className="text-blue-400">
              Please confirm the students details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button className="bg-blue-800" onClick={() => handleScan()}>Open Modal</Button> */}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
