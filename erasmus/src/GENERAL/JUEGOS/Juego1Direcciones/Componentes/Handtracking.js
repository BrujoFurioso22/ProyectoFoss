import React, { useEffect, useRef ,useState } from 'react';
import * as handTrack from 'handtrackjs';
import "../assets/styles/handtracking.css"

function HandTracking() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const modelParams = {
      flipHorizontal: true,
      maxNumBoxes: 1,
      iouThreshold: 0.5,
      scoreThreshold: 0.8,
    };

    handTrack.load(modelParams).then(model => {
      handTrack.startVideo(videoRef.current).then(status => {
        if (status) {
          console.log('La cámara está lista');
          runDetection(model);
        }
      });
    });
  }, []);

  const runDetection = model => {
    model.detect(videoRef.current).then(predictions => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;

      canvas.width = video.width;
      canvas.height = video.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filtra las predicciones para mostrar solo si detecta una mano con alta confianza
      const filteredPredictions = predictions.filter(prediction => prediction.score > 0.5);

      if (filteredPredictions.length > 0) {
        const hand = filteredPredictions[0];
        ctx.fillStyle = 'red';
        ctx.fillRect(hand.bbox[0], hand.bbox[1], hand.bbox[2], hand.bbox[3]);
      }

      requestAnimationFrame(() => {
        runDetection(model);
      });
    });
  };

  return (
    <div className="hand-tracking-container">
      <video
        className="video"
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
      />
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
}

export default HandTracking;