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
import { findAndSyncOrCreateStripeCustomerId } from 'src/infrastructure/stripe/find-and-sync-or-create-stripe-customer-id';
import { UserId } from 'src/domain/user/user-id/user-id';
import { UserRepository } from 'src/infrastructure/repository/user/user-repository';
import { resisterCreditCard } from 'src/infrastructure/stripe/resister-credit-card';
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
}
/*
  @Post('payment')
  public async payment(@Param('accountId') id: string) {
    const paymentIntent: Stripe.PaymentIntent =
      await this.stripe.paymentIntents.create({
        amount: 1000,
        customer: 'cus_Lde2sYXXDC4b5x',
        currency: 'jpy',
        payment_method_types: ['card'],
      });
    console.log('------');
    console.log(paymentIntent);
    return paymentIntent.client_secret;
  }
 */

/*

  @Post('payment2')
  public async payment2() {
    console.log('payment2');
    try {
      const product = await this.stripe.products.create({
        name: 'Gold Special2',
        images: [
          'https://media.stripe.com/e9f5215acd5ba09c9096b07b616f99d2e6a0cd7e.png',
        ],
      });

      const price = await this.stripe.prices.create({
        unit_amount: 100,
        currency: 'jpy',
        product: product.id,
      });

      const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `http://localhost:3000/payment`,
        cancel_url: `http://localhost:3000/payment`,
        payment_method_types: ['card'],
        customer: 'cus_Lde2sYXXDC4b5x',
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
      });
      console.log(session);
      return {
        session_id: session.id,
        checkout_url: session.url,
        customer_id: 'cus_Lde2sYXXDC4b5x',
      };
    } catch (e) {
      console.log(e);
    }
  }
   */
