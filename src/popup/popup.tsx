import { createRoot } from 'react-dom/client'
import { Box, Button, TextField  } from "@mui/material"
import React, { useEffect, useState, useRef  } from 'react'
import QrGenerator from './components/QrGenerator'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { toPng } from "html-to-image";
import { getStoredCode, setStoredCode } from '../utils/storage';
import './popup.css'



const App = () => {
    const [contextUrl, setContextUrl] = useState<string>('')
    const [genValue, setGenValue] = useState<string | null>(null)

    const svgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(()=> {
            getStoredCode().then((key) => {
                setContextUrl(key)
                setGenValue(key) 
            })               
        }, 100)
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContextUrl(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            setGenValue(contextUrl)
            setStoredCode(contextUrl)
        }
    }

    const handleSaveAsPng = async () => {
        if (!svgContainerRef.current) return;
    
        try {
          // Преобразование содержимого div в PNG
          const dataUrl = await toPng(svgContainerRef.current);
          
          // Создание ссылки для скачивания
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "image.png";
          link.click();
        } catch (error) {
          console.error("Ошибка при сохранении PNG:", error);
        }
      };
    

    return (
        <Box sx={{mt: 2}}>
            <TextField id="outlined-basic" 
                label="URL: " 
                variant="outlined" 
                sx={{mb: 1}} 
                fullWidth 
                value={contextUrl}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}/>
            <div ref={svgContainerRef} className='qr-container'>
                {genValue && <QrGenerator value={genValue} />}
            </div>
            <Button 
                variant="contained" 
                startIcon={<SaveAltIcon />} 
                sx={{mt: 1}} 
                fullWidth
                onClick={handleSaveAsPng}
                >
                Download  PNG
            </Button>
            
        </Box>
    )
}



const container = document.createElement('div')
const root = createRoot(container)
document.body.appendChild(container)
root.render(<App />)