import { DataSource , DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres" as "postgres", // It could be mysql, mongo, etc
  host: "localhost",
  port: 5432,
  username: "postgres", // postgre username
  password: "root", // postgre password
  database: "spotify-clone", // postgre db, needs to be created before
  synchronize: false, // if true, you don't really need migrations
  logging: true, 
  entities: ["src/**/*.entity{.ts,.js}"], // where our entities reside
  migrations: ["src/db/migrations/*{.ts,.js}"], // where our migrations reside
};

const dataSorce = new DataSource(dataSourceOptions);
export default dataSorce

