import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async addPost(
        @Body('title') title: string,
        @Body('article') article: string,
        @Body('author') author: string
    ) {
        const generatedId = await this.postsService.createPost(
            title,
            article,
            author,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllPosts() {
        return await this.postsService.getPosts();
    }

    @Get(':id')
    getPost(@Param('id') postId: string) {
        return this.postsService.getSinglePost(postId);
    }

    @Patch(':id')
    async updatePost(
        @Param('id') postId: string,
        @Body('title') title: string,
        @Body('article') article: string,
        @Body('author') author: string
    ) {
        await this.postsService.updatePost(postId, title, article, author);
        return null;
    }

    @Delete(':id')
    async removePost(@Param('id') postId: string) {
        await this.postsService.deletePost(postId);
        return null;
    }
}