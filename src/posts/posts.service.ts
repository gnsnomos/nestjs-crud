import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';

@Injectable()
export class PostsService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {
    }

    async createPost(title: string, article: string, author: string) {
        const createdAt = new Date();
        const newPost = new this.postModel({
            title,
            article,
            author,
            createdAt
        });
        const result = await newPost.save();
        return result.id as string;
    }

    async getPosts() {
        const posts = await this.postModel.find().exec();
        return posts.map(post => ({
            id: post.id,
            title: post.title,
            article: post.article,
            author: post.author,
            createdAt: post.createdAt
        }));
    }

    async getSinglePost(postId: string) {
        const post = await this.findPost(postId);
        return {
            id: post.id,
            title: post.title,
            article: post.article,
            author: post.author,
            createdAt: post.createdAt
        };
    }

    async updatePost(
        postId: string,
        title: string,
        article: string,
        author: string,
    ) {
        const updatedPost = await this.findPost(postId);
        if (title) {
            updatedPost.title = title;
        }
        if (article) {
            updatedPost.article = article;
        }
        if (author) {
            updatedPost.author = author;
        }
        updatedPost.save();
    }

    async deletePost(postId: string) {
        const result = await this.postModel.deleteOne({ _id: postId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find post.');
        }
    }

    private async findPost(id: string): Promise<Post> {
        let post;
        try {
            post = await this.postModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find post.');
        }
        if (!post) {
            throw new NotFoundException('Could not find post.');
        }
        return post;
    }
}