import {Schema, Document, model} from 'mongoose';

export interface IPublisher extends Document {
    name: string;
    books: Schema.Types.ObjectId[];
}

const PublisherSchema = new Schema<IPublisher>({
    name: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

export default model<IPublisher>('Publisher', PublisherSchema);