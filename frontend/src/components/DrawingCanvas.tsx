import React, { useState, useRef } from 'react';

import CanvasDraw from "react-canvas-draw";
import axios from 'axios';

interface DrawingCanvasProps {}

const config = {
    baseURL: 'http://localhost:8090',
    timeout: 60 * 1000,
    withCredentials: true
}

const _axios = axios.create(config);

const DrawingCanvas: React.FC<DrawingCanvasProps> = () => {
    const canvasRef = useRef<CanvasDraw>(null);
    const [recognizedText, setRecognizedText] = useState<string>('');

    const handleCanvasDraw = () => {
        if (!canvasRef.current) return;

        // @ts-ignore
        const imageData = canvasRef.current.canvas.drawing.toDataURL('image/png').split(',')[1];

        console.log(imageData);
        _axios.post(`/api/vision`, {
            base64Image: imageData // 이미지 데이터를 filePath라는 이름으로 전송
        }, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;

        canvasRef.current.clear();
    };

    return (
        <div>
            <CanvasDraw
                ref={canvasRef}
                canvasWidth={1920}
                canvasHeight={720}
                brushRadius={15} // 선의 굵기 설정
                lazyRadius={0} // 마우스를 따라다니는 선의 부드러운 정도 설정
                hideGrid={true} // 그리드 숨기기
            />
            <button onClick={handleCanvasDraw}>Recognize Text</button>
            <button onClick={clearCanvas}>Clear</button>
            <div>Recognized Text: {recognizedText}</div>
        </div>
    );
};

export default DrawingCanvas;
