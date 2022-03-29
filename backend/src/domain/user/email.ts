import { ValueObject } from '../__shared__/value-object';

export interface IEmail {
  email: string;
}

export class Email extends ValueObject<IEmail> {
  public get value() {
    return this.props.email;
  }

  public constructor(props: IEmail) {
    super(props);
    const reg = /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;
    if (!reg.test(props.email)) {
      throw new Error(`$メールアドレスの書式が間違っています。`);
    }
  }
}
