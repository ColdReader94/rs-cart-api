export const JWT_CONFIG = {
  secret: 'secret',
  expiresIn: '12h'
}

export enum ResponseDescriptions {
  Forbidden = 'Not enough permissions for this operation',
  Saved = 'Record has been saved',
  ServerError = 'Server error',
  Unauthorized = 'User isn`t exist or you haven`t authorized',
  NotFound = 'Requested data isn`t exist',
  Updated = 'Record has been updated',
  Get = 'Record(s) has been found',
  BadRequest = 'Something wrong with request',
  NoData = 'Data with that id isn`t exist',
  Deleted = 'Data has been deleted',
}
