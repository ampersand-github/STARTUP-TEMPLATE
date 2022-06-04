import { IOpenBookOAQS } from './__interface__/open-book-OAQS-interface';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { OneBookOutputDTO } from './__dto__/one-book-output-DTO';

export interface IBookDetailPageUC {
  openBookId: OpenBookId;
  openBookOAQS: IOpenBookOAQS;
}
export const bookDetailPageUC = async (
  props: IBookDetailPageUC,
): Promise<OneBookOutputDTO> => {
  const one = await props.openBookOAQS.findOne(props.openBookId);
  if (!one) throw new Error('書籍が見つかりません');
  return new OneBookOutputDTO(one);
};
