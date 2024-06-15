import { io } from 'socket.io-client';
const URL = process.env.REACT_APP_URL || 'http://localhost:4000' as string;
export const socket = io(URL,{autoConnect: false});