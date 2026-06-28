import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class ApiKeyService {
  constructor(private readonly prisma: PrismaService) {}

  private generateKey(): { plainTextKey: string; KeyId: string } {
    const KeyId = crypto.randomUUID().replace(/-/g, '');
    const secret = randomBytes(32).toString('base64');
    const plainTextKey = `VMX_${KeyId}_${secret}`;
    return { plainTextKey, KeyId };
  }

  async create(payload: CreateApiKeyDto) {
    //max 5 API key limit;
    const result = await this.prisma.apiKey.count({
      where: {
        userId: payload.userId,
      },
    });

    if (result >= 5) {
      throw new BadRequestException(
        'You have reached the maximum limit of 5 API Keys. Please contact support teams ',
      );
    }

    const { plainTextKey, KeyId } = this.generateKey();
    const hash = await argon2.hash(plainTextKey, {
      type: argon2.argon2i,
      timeCost: 3,
      memoryCost: 1 << 16,
      parallelism: 1,
    });

    const prefix = plainTextKey.substring(0, 18) + '...';

    await this.prisma.apiKey.create({
      data: {
        id: KeyId,
        userId: payload.userId,
        prefix,
        value: hash,
      },
    });
    return { key: plainTextKey };
  }

  findAll() {
    return `This action returns all apiKey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apiKey`;
  }

  update(id: number, updateApiKey: UpdateApiKeyDto) {
    return `This action updates a #${id} apiKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiKey`;
  }
}
