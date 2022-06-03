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
} from '../../module/logger/custom-logger.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { StripeService } from '../../module/stripe/stripe.service';
import Stripe from 'stripe';

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
    return findAndSyncOrCreateStripeCustomerIdUC({
      stripe: this.stripe,
      accountId: id,
      email: email,
    });
  }

  @Post('add/:stripeCustomerId')
  //  curl http://localhost:3001/stripe/[]
  public async resisterCreditCard(@Param('stripeCustomerId') id: string) {
    console.log('add/:stripeCustomerId');
    console.log(id);
    try {
      const checkoutSession = await this.stripe.checkout.sessions.create({
        mode: 'setup',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
        payment_method_types: ['card'],
        customer: id,
      });
      return {
        session_id: checkoutSession.id,
        checkout_url: checkoutSession.url,
        customer_id: id,
      };
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

// - - - - - - - - - - - -
// idがあれば習得と同期、なければ作成
const findAndSyncOrCreateStripeCustomerIdUC = async ({
  stripe: stripe,
  accountId: id,
  email: email,
}): Promise<string> => {
  // todo accountIdからstripeIdを習得するユースケース
  //       const a = await this.stripe.customers.retrieve()
  const stripeCustomerId = 'cus_Lde2sYXXDC4b5x';
  // const stripeCustomerId = null

  // 習得できる場合emailアドレスを同期
  if (stripeCustomerId) {
    const result = await stripe.customers.update(stripeCustomerId, {
      email: email,
    });
    return result.id;
  } else {
    const result = await stripe.customers.create({
      email: email,
      metadata: {
        uuid: 'アカウントのuuid',
      },
    });
    // todo idをdbへ登録
    return result.id;
  }
};
