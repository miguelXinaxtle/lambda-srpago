export interface IRegisterUserUseCase {
  execute(urlFile: string): Promise<string>;
}
