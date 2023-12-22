import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef, useState } from 'react';

interface IBlockVideo {
    url?: string;
    thumbnail?: string;
}

export const BlockVideo: React.FC<IBlockVideo> = ({ url, thumbnail }) => {
    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

    useEffect(() => {
        const video: any = videoRef.current;
        if (!video) return;

        video.controls = true;

        const players = Array.from(document.querySelectorAll('#video')).map(
            (p: any) => new Plyr(p, {}),
        );

        /**
         * @description the below event method will prevent
         * playing two videos at the same time
         */

        players.forEach(function (p: any) {
            p.on('play', (event: any) => {
                const instance = event.detail.plyr;
                players.forEach(function (p: any) {
                    if (p != instance) p.stop();
                });
            });

            /**
             * @description the below event method will pause a video
             * when switching to a different tab or software.
             * there are 2 cases: 'hidden' and 'visible'.
             * In this case only 1 case - 'hidden'
             */

            window.addEventListener('visibilitychange', () => {
                switch (document.visibilityState) {
                    case 'hidden':
                        p.pause();
                        break;
                    default:
                        p.pause();
                        break;
                }
            });

            window.removeEventListener('visibilitychange', () => {
                switch (document.visibilityState) {
                    case 'hidden':
                        p.pause();
                        break;
                    default:
                        p.pause();
                        break;
                }
            });
        });

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else if (Hls.isSupported()) {
            const hls = new Hls({ autoStartLoad: false });

            url && hls.loadSource(url);

            /**
           *@description this event method will prevent 
           downloading a video prior to its playing 
           */

            video.addEventListener('play', () => {
                hls.startLoad();
                if (!isVideoPlaying) {
                    hls.stopLoad();
                } else {
                    hls.startLoad();
                }
            });

            hls.attachMedia(video);

            video.removeEventListener('play', () => {
                hls.startLoad();
                if (!isVideoPlaying) {
                    hls.stopLoad();
                } else {
                    hls.startLoad();
                }
            });
        } else {
            console.error(
                'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API',
            );
        }
    }, [videoRef]);

    /**
     * @description this hook will enable stop video
     * when trespassing a specified point (using IntersectionObserver)
     * when scrolling up and down
     */
    useEffect(() => {
        const video: any = videoRef.current;
        const players = document.querySelectorAll('#video');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.5],
        };

        /**
         *
         * @description intersection helper to identify
         * whether the scroll point tresspassed the threshold mark to pause a video
         */
        const handleIntersection = (entries: any) => {
            entries.forEach((entry: any) => {
                if (video.currentTime === 0) return;
                else if (isVideoPlaying || entry.intersectionRatio <= 0.5) {
                    video.pause();
                    setIsVideoPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        players.forEach(p => {
            observer.observe(p);
        });

        return () => {
            observer.unobserve(video);
        };
    }, [isVideoPlaying]);

    return (
        <div>
           

            <video
                data-displaymaxtap
                ref={videoRef}
                id="video"
                preload="none"
                className=" max-h-[450px] w-full p-0"
                poster={thumbnail}
            />
        </div>
    );
};
{
    /* <style>{`
video {
    width: 100% !important;
    max-height: 450px;
    background-color: #0d2328 !important;
    padding: 0 !important;
}
`}</style> */
}
