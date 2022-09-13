import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomLoggerService } from 'src/module/logger/custom-logger.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { StripeService } from 'src/module/stripe/stripe.service';
import { findAndSyncOrCreateStripeCustomerId } from 'src/module/stripe/functions/find-and-sync-or-create-stripe-customer-id';
import { UserId } from 'src/domain/user/user-id/user-id';
import { UserRepository } from 'src/infrastructure/repository/user/user-repository';
import { Stripe } from 'stripe';

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

  @Post('/customer/:id')
  //  curl http://localhost:3001/stripe/
  public async findAndSyncOrCreateStripeCustomerId(
    @Param('id') id: string,
    @Body('email') email: string,
  ): Promise<string> {
    console.log('findAndSyncOrCreateStripeCustomerId');
    return findAndSyncOrCreateStripeCustomerId({
      userId: UserId.create(),
      email: email,
      stripe: this.stripe,
      userR: new UserRepository(this.prismaService),
    });
  }

  @Post('payment')
  public async payment(@Body('productId') productId: string) {
    /*
      productIdを使って、productが購入可能か判定する
     */
    // throw new HttpException('購入不可', HttpStatus.FORBIDDEN);

    /*
      productIdを使って、必要なデータを取得する
    */
    const image =
      'https://m.media-amazon.com/images/P/B09Y1MWK9N.01._SCLZZZZZZZ_SX500_.jpg';
    const name = '良いコード/悪いコード';
    const price = 3378;

    /*
    ストライプカスタマーを取得もしくは作成する
  */
    const customerId = 'cus_Lde2sYXXDC4b5x';

    /*
    paymentIntentsを作成する
  */
    const paymentIntent: Stripe.PaymentIntent =
      await this.stripe.paymentIntents.create({
        amount: price,
        customer: customerId,
        currency: 'jpy',
        payment_method_types: ['card'],
        metadata: {}, // 顧客のuuidとか
      });
    const clientSecret = paymentIntent.client_secret;

    /*
      値を返す
    */
    return {
      clientSecret: clientSecret,
      image: image,
      name: name,
      price: price,
    };
  }

  @Post('fixPayment')
  public async fixPayment(@Body('productId') productId: string) {
    const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

    const subscription = await stripe.subscriptions.create({
      customer: 'cus_LuudRJfOEJXqc7',
      items: [{ price: 'price_1LD1yT2eZvKYlo2CQNE3RYRG' }],
    });
  }
}
