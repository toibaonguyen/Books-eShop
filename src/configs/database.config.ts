
export class DatabaseConfig {
    public readonly host: string;
    public readonly port: number;
    public readonly name: string;
    public constructor(host: string, port: number, name: string) {
        this.host = host;
        this.port = port;
        this.name = name;
    }
}


