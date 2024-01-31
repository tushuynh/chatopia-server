import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from 'src/shared/constants';
import { SuccessResponse } from 'src/common/responses/success.response';
import { ApiResponseCustom } from 'src/core/decorators/apiOkResponse.decorator';
import { GetMessagesDto } from './dtos/getMessages.dto';
import { GetMessagesResponse } from './responses/getMessages.response';

@ApiTags('Message')
@Controller('api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a message' })
  @ApiResponseCustom(HttpStatus.CREATED, SuccessResponse)
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<SuccessResponse> {
    await this.messageService.create(createMessageDto);
    return { message: RESPONSE_MESSAGE.CREATE_MESSAGE_SUCCESS };
  }

  @Get('')
  @ApiOperation({ summary: 'Get messages by user id pair' })
  @ApiResponseCustom(HttpStatus.OK, GetMessagesResponse, true)
  @HttpCode(HttpStatus.OK)
  async getMessages(
    @Query() getMessages: GetMessagesDto,
  ): Promise<Array<GetMessagesResponse>> {
    const { from, to } = getMessages;
    const messages = await this.messageService.getMessagesByUserIdPair(
      from,
      to,
    );

    const response = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    return response;
  }
}
