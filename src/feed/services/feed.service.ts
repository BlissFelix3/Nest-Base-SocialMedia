import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { FeedPostEntity } from 'src/model/post.entity';
import { FeedPost } from 'src/model/post.interface';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feed: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feed.save(feedPost));
  }

  getPost(id: number): Observable<FeedPost> {
    const options: FindOneOptions<FeedPostEntity> = {
      where: { id },
    };
    return from(this.feed.findOne(options));
  }

  getAllPosts(): Observable<FeedPost[]> {
    return from(this.feed.find());
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feed.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feed.delete(id));
  }
}
