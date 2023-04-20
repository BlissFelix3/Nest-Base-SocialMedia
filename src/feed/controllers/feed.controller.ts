import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from 'src/model/post.interface';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  create(@Body() post: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(post);
  }

  @Get()
  GetAll(): Observable<FeedPost[]> {
    return this.feedService.getAllPosts();
  }

  @Get(':id')
  Get(@Param('id') id: number): Observable<FeedPost> {
    return this.feedService.getPost(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
