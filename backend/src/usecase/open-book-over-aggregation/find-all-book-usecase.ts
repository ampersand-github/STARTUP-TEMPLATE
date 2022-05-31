import { IOpenBookOAQS } from './__interface__/open-book-OAQS-interface';
import { OpenBookId } from '../../domain/open-book/open-book-id/open-book-id';
import { OneBookOutputDTO } from './__dto__/one-book-output-DTO';
import { IOpenBookOA } from './__interface__/open-book-OA-interface';

export interface IFindAllBookUC {
  openBookOAQS: IOpenBookOAQS;
}
export const findAllBookUC = async (props: IFindAllBookUC): Promise<OneBookOutputDTO[]> => {
  const all = await props.openBookOAQS.findAll();
  return all.map((one: IOpenBookOA) => new OneBookOutputDTO(one));
};
