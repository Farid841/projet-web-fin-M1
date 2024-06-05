import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { MessageService } from '../modules/message/message.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('message-queue')
export class QueueProcessor {
  constructor(private readonly messageService: MessageService) {}

  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { content, senderId, conversationId } = job.data;
    await this.messageService.createMessage(content, senderId, conversationId);
  }
}