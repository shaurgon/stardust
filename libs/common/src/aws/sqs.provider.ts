import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message, MessageBodyAttributeMap, ReceiveMessageRequest, SendMessageRequest } from 'aws-sdk/clients/sqs';
import { SQS_CONNECTION } from './aws.constants';

@Injectable()
export class SqsProvider {
  @Inject(SQS_CONNECTION)
  private sqs;

  private queueUrl: string;

  constructor(private readonly configService: ConfigService) {
    const config = configService.get('sqs');
    this.queueUrl = `${config.params.endpoint}/${config.queue}`;
  }

  async sendMessage(messageBody: string, attributes?: MessageBodyAttributeMap, delay = 0): Promise<void> {
    const params: SendMessageRequest = {
      DelaySeconds: delay * 15,
      QueueUrl: this.queueUrl,
      MessageBody: messageBody,
      MessageAttributes: attributes,
    };

    const result = await this.sqs
      .sendMessage(params)
      .promise()
      .catch((e: any) => console.log(e.message));
    if (!result) {
      return;
    }

    console.log('Message sent, ID: ' + result['MessageId']);
    return result;
  }

  /**
   * receive count messages from queue
   * @param count number of messages
   */
  async receiveMessages(count?: number): Promise<Message[]> {
    const params: ReceiveMessageRequest = {
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: 10,
      MaxNumberOfMessages: count ? count : 1,
    };

    const result = await this.sqs
      .receiveMessage(params)
      .promise()
      .catch((e: any) => console.log(e.message));
    if (!result) {
      return;
    }

    console.log('Request completed', result.RequestId);

    return result['Messages'];
  }

  /**
   * receive single message from queue
   */
  async receiveMessage(): Promise<Message> {
    const params: ReceiveMessageRequest = {
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: 10,
    };

    const result = await this.sqs
      .receiveMessage(params)
      .promise()
      .catch((e: any) => console.log(e.message));
    if (!result) {
      return;
    }

    console.log('Request completed', result.RequestId);
    return result['Messages'][0];
  }

  async deleteMessage(receiptHandle: string) {
    const deleteParams = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };

    await this.sqs
      .deleteMessage(deleteParams)
      .promise()
      .catch((e: any) => console.log(e.message));
  }
}
