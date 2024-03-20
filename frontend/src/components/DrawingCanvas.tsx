import React, { useState, useRef } from 'react';
import axios from 'axios';

let config = {
    baseURL: 'http://localhost:8090',
    timeout: 60 * 1000,
    withCredentials: true
}

const _axios = axios.create(config);

const DrawingCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [recognizedText, setRecognizedText] = useState<string>('');

    const handleCanvasDraw =  () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const imageData = canvas.toDataURL('image/png').split(',')[1];

        console.log(imageData)
        _axios.post(`/api/vision`, {
            base64Image : imageData // 이미지 데이터를 filePath라는 이름으로 전송
        }, {
            headers: {
                'Content-Type': 'application/json; charset=uft-8'
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={400}
                height={200}
                onMouseDown={(e) => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const context = canvas.getContext('2d');
                    if (!context) return;

                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    context.beginPath();
                    context.moveTo(x, y);

                    canvas.addEventListener(
                        'mousemove',
                        (ev) => {
                            const rect = canvas.getBoundingClientRect();
                            const mx = ev.clientX - rect.left;
                            const my = ev.clientY - rect.top;
                            context.lineTo(mx, my);
                            context.stroke();
                        },
                        false
                    );

                    canvas.addEventListener(
                        'mouseup',
                        () => {
                            canvas.removeEventListener('mousemove', () => {});
                        },
                        false
                    );
                }}
            />
            <button onClick={handleCanvasDraw}>Recognize Text</button>
            <div>Recognized Text: {recognizedText}</div>
        </div>
    );
};

export default DrawingCanvas;
