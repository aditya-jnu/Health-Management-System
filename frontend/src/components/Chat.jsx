import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Video from 'twilio-video';

const Chat = () => {
    const {code} = useParams()
    const [room, setRoom] = useState(null);
    const [token, setToken] = useState(null);
    const [localTracks, setLocalTracks] = useState([]);
    const [remoteParticipants, setRemoteParticipants] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(()=>{
        console.log("roomcode ",code)
        setRoom(code)
    },[code])
    const identity = `user-${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl = "http://localhost:4000";

    const joinRoom = async () => {
        try {
            const localVideoTrack = await Video.createLocalVideoTrack();
            const localAudioTrack = await Video.createLocalAudioTrack();
            setLocalTracks([localVideoTrack, localAudioTrack]);

            const connectedRoom = await Video.connect(token, {
                name: room,
                tracks: [localVideoTrack, localAudioTrack],
            });

            setRoom(connectedRoom);
            setIsConnected(true);

            // Handle remote participants
            connectedRoom.participants.forEach(handleParticipantConnected);
            connectedRoom.on('participantConnected', handleParticipantConnected);
            connectedRoom.on('participantDisconnected', handleParticipantDisconnected);

            // Cleanup on disconnect
            connectedRoom.once('disconnected', (room) => {
                room.localParticipant.tracks.forEach((publication) => {
                    publication.track.stop();
                });
                setRoom(null);
                setLocalTracks([]);
                setRemoteParticipants([]);
                setIsConnected(false);
            });
        } catch (error) {
            console.error('Error connecting to room:', error);
        }
    };

    const fetchToken = async () => {
        console.log("Fetching token......")
        try {
            if (token) {
                console.log("prev token ",token)
                joinRoom();
            }
            else{
                const response = await fetch(`${baseUrl}/api/v1/room?identity=${identity}&room=${room}`);
                const data = await response.json();
                console.log("new token ",data)
                setToken(data.token);
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    useEffect(() => {
        if (token && !isConnected) {
            

            joinRoom();
        }
    }, [token]);

    const handleParticipantConnected = (participant) => {
        console.log(`Participant connected: ${participant.identity}`);
        participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
                handleTrackSubscribed(publication.track);
            }
        });
        participant.on('trackSubscribed', handleTrackSubscribed);
        participant.on('trackUnsubscribed', handleTrackUnsubscribed);
    };

    const handleParticipantDisconnected = (participant) => {
        console.log(`Participant disconnected: ${participant.identity}`);
        setRemoteParticipants((prevParticipants) =>
            prevParticipants.filter((p) => p.participant !== participant)
        );
    };

    const handleTrackSubscribed = (track) => {
        setRemoteParticipants((prevParticipants) => [
            ...prevParticipants,
            { track },
        ]);
    };

    const handleTrackUnsubscribed = (track) => {
        setRemoteParticipants((prevParticipants) =>
            prevParticipants.filter((p) => p.track !== track)
        );
    };

    const handleLeaveRoom = () => {
        if (room) {
            room.disconnect();
        }
    };

    return (
        <div className='bg-black min-h-screen w-screen p-5'>
            <p className='text-white font-bold text-3xl text-center mb-5'>Room Code is <span className='italic font-normal font-serif'>{code}</span></p>
            <div>
                <div id="remote-video-container" className='border w-[320px] m-1'>
                    {remoteParticipants.map(({ track }, index) =>
                        track.kind === 'video' ? (
                        <video key={index}
                            ref={(video) => {
                                if (video) {
                                    video.srcObject = new MediaStream([track.mediaStreamTrack]);
                                    video.play();
                                }
                            }}
                            width="320"
                            height="240"
                        />
                        ) : 
                        track.kind === 'audio' ? (
                        <audio key={index}
                            ref={(audio) => {
                                if (audio) {
                                    audio.srcObject = new MediaStream([track.mediaStreamTrack]);
                                    audio.play();
                                }
                            }}
                        />
                        ) : null
                    )}
                </div>

                <div className='w-[330px] border p-1'>
                    <div id="local-video-container" className='w-[320px] mb-1'>
                        {localTracks.map((track, index) =>
                        track.kind === 'video' ? (
                        <video key={index}
                            ref={(video) => {
                                if (video) {
                                    video.srcObject = new MediaStream([track.mediaStreamTrack]);
                                    video.play();
                                }
                            }}
                            width="320"
                            height="240"
                            muted
                        />
                        ) : null
                        )}
                    </div>
                    <div className={`flex ${isConnected ? 'justify-end' : 'justify-start'}`}>
                    {!isConnected ? (<button onClick={fetchToken} disabled={isConnected}
                    className='px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'>
                        Start Video Call
                    </button>):null}
                    {isConnected ? (<button onClick={handleLeaveRoom}
                    className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer">
                        Leave Room
                    </button>):null}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Chat;
