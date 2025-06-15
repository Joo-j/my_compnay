"use client"
import { useEffect, useState } from "react";

export default function NoiseMeter() {
  const [dbLevel, setDbLevel] = useState<number | null>(null);
  const [status, setStatus] = useState("측정 중...");

  useEffect(() => {
    async function initMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        const mic = audioContext.createMediaStreamSource(stream);
        mic.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const getDb = () => {
          analyser.getByteFrequencyData(dataArray);
          const values = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          const db = Math.round((values / 256) * 100); // pseudo dB
          setDbLevel(db);

          if (db < 20) setStatus("😶 Dead Mode (정적)");
          else if (db < 50) setStatus("🔇 조용한 상태");
          else if (db < 75) setStatus("💬 적당한 소음");
          else setStatus("🔥 불타는 칼퇴각");

          requestAnimationFrame(getDb);
        };
        getDb();
      } catch (err) {
        setStatus("❌ 마이크 권한이 필요합니다.");
      }
    }

    initMic();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">🎧 사무실 소리 측정기</h1>
      <div className="text-6xl font-bold">{dbLevel ?? "..."}</div>
      <p className="text-gray-500 text-sm mt-2">측정값 (단위: dB 비슷한 수치)</p>
      <div className="mt-4 text-xl">{status}</div>
    </div>
  );
}