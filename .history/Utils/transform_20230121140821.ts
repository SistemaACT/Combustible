import { useState } from "react";
import sharp from "sharp"

export function ProcessImage(file:File): Promise<{filename: string; mimeType: string; bytes: number[]}> {

    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        let obj: {filename: string; mimeType: string; bytes: number[]};
    
        // Define the type of the e parameter and use a type assertion
        fr.onload = async function(e: ProgressEvent<FileReader>) {
          const compressedImage = await sharp(new Uint8Array((e.target as {result: ArrayBuffer}).result))
            .resize({width: 800})
            .jpeg({quality: 75})
            .toBuffer();
          obj = {
            filename: file.name,
            mimeType: file.type,
            bytes: Array.from(compressedImage)
          };
    
          // Resolve the Promise with the obj variable
          resolve(obj);
        };
        fr.onerror = function(e: ProgressEvent<FileReader>) {
          // Reject the Promise with the error
          reject(e);
        };
        fr.readAsArrayBuffer(file);
      });
}

