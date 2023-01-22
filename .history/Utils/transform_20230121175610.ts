
export function ProcessImage(file:File): Promise<{filename: string; mimeType: string; bytes: number[]}> {

    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        let obj: {filename: string; mimeType: string; bytes: number[]};
    
        // Define the type of the e parameter and use a type assertion
        fr.onload = function(e: ProgressEvent<FileReader>) {
          obj = {
            filename: file.name,
            mimeType: file.type,
            bytes: Array.from(new Int8Array((e.target as {result: ArrayBuffer}).result))
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

