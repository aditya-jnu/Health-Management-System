import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Video from 'twilio-video';

const Chat = () => {
    const {code} = useParams()
    const location = useLocation();
    const appointment = location.state?.appointment || {};
    const [room, setRoom] = useState(null);
    const [token, setToken] = useState(null);
    const [localTracks, setLocalTracks] = useState([]);
    const [remoteParticipants, setRemoteParticipants] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(()=>{
        console.log("roomcode ",code)
        setRoom(code)
    },[code])
    const identity = `user-${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl = "http://localhost:4000";

    // Calculate remaining time until the appointment
    // Memoize the appointmentDateTime
    const appointmentDateTime = useMemo(() => {
        if (appointment) {
            return new Date(`${appointment.appointment_date} ${appointment.time_slot.split(" - ")[0]}`);
        }
        return null;
    }, [appointment]);
  
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            if (appointmentDateTime) {
                const diff = appointmentDateTime - now;
  
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    setTimeLeft(`${days} days, ${hours} hours, and ${minutes} minutes left`);
                } else {
                        setTimeLeft("The appointment time has passed.");
                    }
             }
        };
    
        // Calculate time left initially and set interval
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
  
        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [appointmentDateTime]);
  

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
            {/* <p className='text-white font-bold text-3xl text-center mb-5'>Room Code is <span className='italic font-normal font-serif'>{code}</span></p> */}
            <p className="text-white text-4xl text-center mb-5 font-bold">{timeLeft}</p>
            <p className="text-white text-2xl text-center mb-5">
                Appointment with <strong>{appointment.doctor_name}</strong> at <strong>{appointment.hospital_name}</strong>
            </p>
            <div className='flex justify-center gap-5'>
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
            </div>
        </div>
        
    );
};

export default Chat;
