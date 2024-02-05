const env = process.env['NODE_ENV'];

export enum DatabaseTypes {
    MONGODB,
    POSTGRE
};

export const DATABASE_HOST: string = process.env[`${env}_DATABASE_HOST`] as string;
export const DATABASE_PORT: number = process.env[`${env}_DATABASE_PORT`] as unknown as number;
export const DATABASE_NAME: string = process.env[`${env}_DATABASE_NAME`] as string;