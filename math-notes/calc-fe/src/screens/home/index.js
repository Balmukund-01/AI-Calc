import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { SWATCHES } from '@/constants';
import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";
import axios from 'axios';
export default function Home() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('rgba(255, 255, 255)');
    const [reset, setReset] = useState(false);
    const [result, setResult] = useState();
    const [latexExpression, setLatexExpression] = useState([]);
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
    const [dictOfVars, setDictOfVars] = useState({});
    useEffect(() => {
        if (reset) {
            resetCanvas();
            setLatexExpression([]);
            setResult(undefined);
            setDictOfVars({});
            setReset(false);
        }
    }, [reset]);
    useEffect(() => {
        if (latexExpression.length > 0 && window.MathJax) {
            setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
                window.MathJax.Hub.Config({});
            }, 0);
        }
    }, [latexExpression]);
    useEffect(() => {
        if (result) {
            renderLatexToCanvas(result.expression, result.answer);
        }
    }, [result]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
            window.MathJax.Hub.Config({
                tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
            });
        };
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    const joinCharacters = (stringArray) => {
        return stringArray.join(''); // This will join characters without extra spaces
    };
    const renderLatexToCanvas = (expression, answer) => {
        const latex = `\\(\\LARGE{${joinCharacters(expression.split(''))} = ${answer}}\\)`;
        setLatexExpression([...latexExpression, latex]);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };
    const sendData = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/calculate`,
                data: {
                    image: canvas.toDataURL('image/png'),
                    dict_of_vars: dictOfVars,
                }
            });
            const resp = await response.data;
            if (Array.isArray(resp)) {
                // console.log('Response: ', resp);
                resp.forEach((data) => {
                    if (data.assign === true) {
                        setDictOfVars({
                            ...dictOfVars,
                            [data.expr]: data.result
                        });
                    }
                });
            }
            else {
                console.warn('API response was not an array');
            }
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
            for (let y = 0; y < canvas?.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    if (imageData.data[(y * canvas.width + x) * 4 + 3] > 0) {
                        if (x < minX)
                            minX = x;
                        if (x > maxX)
                            maxX = x;
                        if (y < minY)
                            minY = y;
                        if (y > maxY)
                            maxY = y;
                    }
                }
            }
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            setLatexPosition({ x: centerX, y: centerY });
            resp.data.forEach((data) => {
                setTimeout(() => {
                    setResult({
                        expression: data.expr,
                        answer: data.result
                    });
                }, 1000);
            });
        }
    };
    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = "black";
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };
    const stopDrawing = () => {
        setIsDrawing(false);
    };
    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Button, { onClick: () => setReset(true), className: "z-20 bg-black text-white", variant: 'default', color: "black", children: "Reset" }), _jsx(Group, { className: "z-20", children: SWATCHES.map((swatchColor) => (_jsx(ColorSwatch, { color: swatchColor, onClick: () => setColor(swatchColor) }, swatchColor))) }), _jsx(Button, { onClick: sendData, className: "z-20 bg-black text-white", variant: 'default', color: "black", children: "Calculate" })] }), _jsx("canvas", { ref: canvasRef, id: "canvas", className: "absolute top-0 left-0 w-full h-full", onMouseDown: startDrawing, onMouseOut: stopDrawing, onMouseUp: stopDrawing, onMouseMove: draw }), latexExpression && latexExpression.map((latex, index) => (_jsx(Draggable, { defaultPosition: latexPosition, onStop: (_e, data) => setLatexPosition({ x: data.x, y: data.y }), children: _jsx("div", { className: "absolute text-white", children: _jsx("div", { className: "latex-content", children: latex }) }) }, index)))] }));
}
