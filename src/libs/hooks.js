import { useEffect, useState } from 'react';



export function useMediaStream() {
  const [streams, setStreams] = useState(null);

  useEffect(() => {
    const streamInit = async () => {
      console.log('streaminit ran')
      const options = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: true,
      };
      const mediaStreams = {};
      try {
        const stream = await navigator.mediaDevices.getUserMedia(options);
        // console.log(stream)
        mediaStreams.audio = new MediaStream([stream.getAudioTracks()[0]]);
        mediaStreams.video = new MediaStream([stream.getVideoTracks()[0]]);
      } catch (err) {
        console.error('streamInit', err);
      } finally {
        setStreams(mediaStreams);
      };
    };
    if (!streams) {
      streamInit();
    };
  }, [streams, setStreams]);

  return streams;
};
