import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CustomLoggerService,
  ILog,
} from 'src/module/logger/custom-logger.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { StripeService } from 'src/module/stripe/stripe.service';
import { findAndSyncOrCreateStripeCustomerId } from './stripe/find-and-sync-or-create-stripe-customer-id';
import { UserId } from 'src/domain/user/user-id/user-id';
import { UserRepository } from 'src/infrastructure/repository/user/user-repository';
import { resisterCreditCard } from './stripe/resister-credit-card';

@Controller('stripe')
export class StripeController {
  private stripe = this.stripeService.stripe;
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: CustomLoggerService,
    private readonly stripeService: StripeService,
  ) {}

  @Get()
  //  curl http://localhost:3001/stripe/
  public async index() {
    return 'passed!';
  }

  @Post(':id')
  //  curl http://localhost:3001/stripe/
  public async findAndSyncOrCreateStripeCustomerId(
    @Param('id') id: string,
    @Body('email') email: string,
  ): Promise<string> {
    return findAndSyncOrCreateStripeCustomerId({
      userId: UserId.create(),
      email: email,
      stripe: this.stripe,
      userR: new UserRepository(this.prismaService),
    });
  }

  @Post('add/:stripeCustomerId')
  //  curl http://localhost:3001/stripe/[]
  public async resisterCreditCard(@Param('stripeCustomerId') id: string) {
    console.log('add/:stripeCustomerId');
    console.log(id);
    try {
      return resisterCreditCard({
        stripe: this.stripe,
        customerId: id,
        successUrl: 'http://localhost:3000',
        cancelUrl: 'http://localhost:3000',
      });
    } catch (e) {
      console.log(e);
      const props: ILog = {
        userId: '-',
        message: e.message,
        module: 'StripeController.',
        method: 'post',
      };
      this.logger.error(props, e.toLocaleString());
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
