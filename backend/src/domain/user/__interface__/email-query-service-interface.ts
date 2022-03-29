export interface IEmailQueryService {
  matchEmail(email: string): Promise<boolean>;
}
