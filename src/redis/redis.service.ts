/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  public client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'redis-13369.c325.us-east-1-4.ec2.cloud.redislabs.com',
      port: 13369,
      password: 'O1FvT3RD4Z0cX4WBnfzP9zoU5F1PQomB',
    });
    this.client.connect().catch((error) => 
    console.error('Redis connection error:', error));
  }

}