export function ProcessImage(file:File): Promise<{filename: string; mimeType: string; bytes: number[]}> {
  return new Promise((resolve, reject) => {
      const fr = new FileReader();
      let obj: {filename: string; mimeType: string; bytes: number[]};

      fr.onload = function(e: ProgressEvent<FileReader>) {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = function() {
              const canvas = document.createElement('canvas');
              canvas.width = image.width;
              canvas.height = image.height;
              canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
              obj = {
                  filename: file.name,
                  mimeType: "image/webp",
                  bytes: Array.from(Buffer.from(canvas.toDataURL("image/webp").split(",")[1], 'base64'))
              };
              resolve(obj);
          }
      };
      fr.onerror = function(e: ProgressEvent<FileReader>) {
          reject(e);
      };
      fr.readAsDataURL(file);
  });
}
