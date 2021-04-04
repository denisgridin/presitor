import { IUser } from '~/store/user'

export interface ITokenData {
  accessToken: string,
  refreshToken: string,
  user: IUser
}
