import { User } from "../Entity/UserEntity";
import  {Products}  from "../Entity/ProductEntity";
import { Category } from "../Entity/CategoryEntity";

type configType = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: any;
  logging:boolean;
};

const config: configType = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "ecom",
  synchronize: true,
  entities: [User,Products,Category],
  logging: true
};

export default config;
