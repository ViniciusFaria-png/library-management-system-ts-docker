import {Schema, model, Document} from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    publisher?: Schema.Types.ObjectId;
}

const BookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publicationYear: { type: Number, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' }
});

export default model<IBook>('Book', BookSchema);