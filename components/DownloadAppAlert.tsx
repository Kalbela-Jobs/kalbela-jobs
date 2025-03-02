'use client';
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Download, Terminal } from "lucide-react";
import DownloadApp from "./navbar/DownloadApp";

const DownloadAppAlert = () => {

    return (
        <div
            className={`w-full flex justify-center transition-all duration-300 ${isSticky ? "sticky bottom-[300px]" : "fixed bottom-5"
                }`}
        >
            <div className="!w-[700px] ">
                <Alert className="bg-[#efebeb] !shadow-lg !rounded-sm !flex !items-center !justify-between">
                    <div className="flex items-center gap-2">
                        <Download className="" />
                        <h1>Download Our App</h1>
                    </div>
                    <DownloadApp />
                </Alert>
            </div>
        </div>
    );
};

export default DownloadAppAlert;
