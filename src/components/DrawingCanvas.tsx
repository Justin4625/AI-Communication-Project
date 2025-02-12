import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useStore } from '../store';

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const { isGameActive, gameMode, updateDrawing } = useStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: 600,
      height: 400,
      backgroundColor: 'white',
    });

    const canvas = fabricRef.current;
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = '#000000';

    canvas.on('path:created', () => {
      updateDrawing(JSON.stringify(canvas.toJSON()));
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  const clearCanvas = () => {
    if (fabricRef.current) {
      fabricRef.current.clear();
      fabricRef.current.backgroundColor = 'white';
      updateDrawing('');
    }
  };

  if (gameMode !== 'drawing') return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <canvas ref={canvasRef} />
      <button
        onClick={clearCanvas}
        disabled={!isGameActive}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
      >
        Clear Canvas
      </button>
    </div>
  );
}