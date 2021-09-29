export interface IS3Helper {
  get(bucket: string, key: string): Promise<any>;
}
