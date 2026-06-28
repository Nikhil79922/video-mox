/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api-keys')
@ApiTags('API Keys')
@ApiBearerAuth()
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new API Key' })
  create(@Req() req: any) {
    return this.apiKeyService.create(req.user.id);
  }

  @Get()
  findAll() {
    return this.apiKeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiKeyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiKeyDto: UpdateApiKeyDto) {
    return this.apiKeyService.update(+id, updateApiKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiKeyService.remove(+id);
  }
}
