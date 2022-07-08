import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

export interface Post extends mongoose.Document {
    id: string;
    title: string;
    article: string;
    author: string;
    createdAt: Date;
}