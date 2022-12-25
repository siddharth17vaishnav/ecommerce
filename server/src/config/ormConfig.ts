import { User } from "../Entity/UserEntity";

type configType = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: any;
};

const config: configType = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "ecom",
  synchronize: true,
  entities: [User],
};

export default config;
