import React, { useState, useRef } from 'react'
import { Button, Checkbox, FormControlLabel, Typography, IconButton} from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ImageIcon from '../Icons/ImageIcon'
 
//Styles
import './image.scss'

interface ImageUploaderProps {
    initImages?:string[]
  }

const ImageUploader = ({initImages}:ImageUploaderProps)=>{
    const [images,setImages]= useState<string[]>( initImages || [])
    const [defaultImageIndex, setDefaultImageIndex]=useState(0)
    const inputRef= useRef<HTMLInputElement>(null)
    const onChangeImage= (e:React.FormEvent<HTMLInputElement>)=>{
        const  target=e.target as HTMLInputElement
        if(target.files){
            const files=Array.from(target.files)
            setImages([...images,...files.map(file=>URL.createObjectURL(file))])
        }
    }
    const handleClick= ()=>{
        inputRef?.current?.click()
    }
    const onRemoveImage= (imageIndex:number) => {
        setImages(images.filter((img,index)=>{
            if(index===imageIndex) URL.revokeObjectURL(img)
            return index !==imageIndex
        }))
    }
    
    const onImageDefaultChange =(imageIndex:number) =>{
        setDefaultImageIndex(imageIndex)
    }

    return (
        <div style={{width: 333, height: 360}} className='flex flex-col imageUploader p-5'>
        { images.length>0 ? 
            <div className='flex flex-row flex-wrap' >
                {                
                    images.map((imageSrc,i) => <Image  key={`image${i}`}  imageIndex={i}  
                                            selected={i===defaultImageIndex} src={imageSrc} onRemoveImage={onRemoveImage}  
                                            onImageDefaultChange={onImageDefaultChange}
                                            />
                    )
                }
               
            </div>
            :
            <div className='flex items-center justify-center'>
                <ImageIcon/>
            </div>
        }
            <div className='flex  flex-1 flex-col justify-end items-center mb-10'>
                <Button variant="contained" onClick={handleClick}>TELECHARGER</Button>
                <input className='hidden' ref={inputRef} type="file" multiple accept="image/*" onChange={onChangeImage} />
            </div>
            
        </div>
    )
}


interface ImageProps {
 imageIndex: number
 src: string,
 selected: boolean,
 onRemoveImage?: (index:number)=> void
 onImageDefaultChange?:  (index:number)=> void

}

const Image = ({imageIndex, src,selected, onRemoveImage,onImageDefaultChange}:ImageProps)=>{
        
        const onClose = () => {
            onRemoveImage?.(imageIndex)
        }
        const onHandleChange= () => {
            onImageDefaultChange?.(imageIndex)
        }

        return (
        <div className= "image">
            <div className={`${selected ? "image-background-selected" : "image-background"}`}>
                <img  src={src} alt={src} />
                <IconButton style={{ position:"absolute", top:-7, right:-7,  
                            backgroundColor:'white', borderRadius:"50%",  color:"#716dd4", height:20, width:20, 
                        }}
                        onClick={onClose}
                >
                    <CloseRoundedIcon  style={{  backgroundColor:'white', color:"#716dd4", height:20, width:20}} />
                </IconButton>
 
                 <div className='flex default-iamge items-center text-white text-xs'>
                    <FormControlLabel  
                        control={
                            <Checkbox
                                icon={ selected ? <RadioButtonCheckedIcon />  : <RadioButtonUncheckedIcon />}
                                checkedIcon={!selected ? <RadioButtonUncheckedIcon />  : <RadioButtonCheckedIcon />}
                                style={{color:"white",transform: "scale(0.5)"}}
                                size="small"
                            />
                            
                        }
                        onChange={onHandleChange}
                        label={<Typography variant="h6" style={{ fontSize:10}}>image par defaut</Typography>}
                    />

                 </div>
            </div>
        </div>
        )
}


export default ImageUploader