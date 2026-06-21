import { Controller , Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('api-keys')
@ApiTags('API keys')
@ApiBearerAuth()
export class ApiKeyController{
    constructor(private readonly apiKeyService : ApiKeyService){
        @Post()
        @ApiOperation({summary : 'Create a new Api Key'})
        async createApiKey(@Req() req:any){
return this.apiKeyService.createApiKey(req.user.id, body.name);
        }
    }
}
