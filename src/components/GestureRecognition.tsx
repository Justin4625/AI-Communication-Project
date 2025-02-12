import React, { useEffect, useRef } from 'react';
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { useStore } from '../store';

export function GestureRecognition() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isGameActive, gameMode, updateGesture } = useStore();
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  useEffect(() => {
    if (gameMode !== 'gestures') return;

    const initializeGestureRecognition = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      recognizerRef.current = await GestureRecognizer.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 2
      });

      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      }
    };

    initializeGestureRecognition();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [gameMode]);

  const processVideo = async () => {
    if (!videoRef.current || !recognizerRef.current || !isGameActive) return;

    const recognizer = recognizerRef.current;
    const video = videoRef.current;

    if (video.videoWidth === 0) return;

    const gestureRecognitionResult = recognizer.recognizeForVideo(video, Date.now());
    
    if (gestureRecognitionResult.gestures.length > 0) {
      const gesture = gestureRecognitionResult.gestures[0][0];
      updateGesture(gesture.categoryName);
    }

    requestAnimationFrame(processVideo);
  };

  useEffect(() => {
    if (isGameActive && gameMode === 'gestures') {
      processVideo();
    }
  }, [isGameActive, gameMode]);

  if (gameMode !== 'gestures') return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[600px] h-[400px] object-cover rounded-lg"
      />
    </div>
  );
}