import { io } from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.REACT_APP_URL as string;
export const socket = io(URL,{autoConnect: false});