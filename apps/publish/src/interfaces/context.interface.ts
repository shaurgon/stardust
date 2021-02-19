export interface Context {
  functionName?: string;
  functionVersion?: string;
  memoryLimitInMB?: any;
  requestId: string;
  token?: any;
  getRemainingTimeInMillis?: any;
  getPayload?: any;
}
