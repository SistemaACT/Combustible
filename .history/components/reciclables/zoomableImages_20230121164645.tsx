import React from 'react'
import Image from "next/image"

type Props = {
    src:string
    width:number,
    height:number,
    className?: string,
    id?:string|number
    alt: string
}

export default function ZoomableImages({src, width, height, className, id, alt}:Props) {
    const [zoom, setZoom] = React.useState<number>(1);
    const [zoomStyles, setSytle] = React.useState({
        transform: "scale(1)",
        transition:"transform 0.2s",
        cursor:"pointer"
    })
    

    console.log("Zoomable", src)
    function handleZoom(){
        if(zoom <= 3){
                setSytle({
                    transform: `scale(${zoom+1})`,
                    transition:"transform 0.2s",
                    cursor:"pointer"
                })
            setZoom(zoom+1)
        }else{
            setZoom(1)
            setSytle({
                transform: "scale(1)",
                transition:"transform 0.2s",
                cursor:"pointer"
            })
        }
    }

  return (
      <div>
        <img className={className} style={zoomStyles} src={src} width={width} height={height} alt={alt} onClick={handleZoom}></img>
         <Image id={id?.toString()}  className={className} style={zoomStyles} src={src} width={width} height={height} alt={alt} onClick={handleZoom}/>

    </div>
  )
}
