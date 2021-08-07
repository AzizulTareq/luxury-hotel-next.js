import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleRoom, updataRoom, deleteRoom } from '../../../controllers/roomControllers';

const handler = nc();

dbConnect();

handler.get(getSingleRoom);
handler.put(updataRoom);
handler.delete(deleteRoom);

export default handler