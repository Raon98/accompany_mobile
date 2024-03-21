import React, {useState, useRef, useEffect} from 'react';

import CanvasDraw from "react-canvas-draw";
import {$api} from "plugins/api";

interface DrawingCanvasProps {}
enum Language {
    ENGLISH = '영어(ENGLISH)',
    KOREAN = '한글(KOREAN)'
}

const {AsyncPost} = $api

const DrawingCanvas: React.FC<DrawingCanvasProps> = () => {
    const canvasRef = useRef<CanvasDraw>(null);
    const [recognizedText, setRecognizedText] = useState<string[]>([]);
    const [lang, setLang] = useState<String>(Language.KOREAN)
    const func = {
        handleCanvasDraw: () => {
            if (!canvasRef.current) return;
            // @ts-ignore
            const imageData = canvasRef.current.canvas.drawing.toDataURL('image/png').split(',')[1];
            const params = {base64Image: imageData};

            AsyncPost('ext', 'GoogleVision', 'DrawingCanvass', params,
                (res) => {
                    setRecognizedText(func.recognizedFilter([...res.data]))
                });

          // TEST :  func.recognizedFilter([...'김ㅅtㅣ씩시TA'])
        },
        clearCanvas:()=>{
            if (!canvasRef.current) return;
            canvasRef.current.clear();
        },
        /*20240321 텍스트 필터기능 모음자음일경우 filter*/
        recognizedFilter:(textArr:string[])=> {
            let arr = textArr.filter(v => v !== '\n' && lang === Language.KOREAN ?
                (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(v) && func.containsLetters(v)) : /[a-zA-Z]/.test(v))

            return arr;
        },
        containsLetters:(str:string) => {
            let word: { w1: string, w2: string }[] = [{w1: 'ㄱ', w2: 'ㅎ'}, {w1: 'ㅏ', w2: 'ㅣ'}]

            let result
            for (let i = 0; i < word.length; i++) {
                result = word.every(char => str <= word[i].w2 && word[i].w1 <= str)
                if (result === true) {
                    return false
                }
            }
            return true
        }
    }
    useEffect(()=>{
        if(recognizedText.length > 0) {
            console.log(recognizedText)
        }

    },[recognizedText])


    return (
        <div>
            <CanvasDraw
                ref={canvasRef}
                canvasWidth={1280}
                canvasHeight={720}
                brushRadius={15} // 선의 굵기 설정
                lazyRadius={0} // 마우스를 따라다니는 선의 부드러운 정도 설정
                hideGrid={true} // 그리드 숨기기
            />
            <button onClick={func.handleCanvasDraw}>Recognize Text</button>
            <button onClick={func.clearCanvas}>Clear</button>
            <div style={{fontSize: 30}}>현재 언어 : {lang}</div>
            <button
                onClick={() => lang === Language.KOREAN ? setLang(Language.ENGLISH) : setLang(Language.KOREAN)}>언어변경
            </button>
            <div style={{fontSize: 30}}>추출한 텍스트입니다.: {recognizedText}</div>
        </div>
    );
};

export default DrawingCanvas;
