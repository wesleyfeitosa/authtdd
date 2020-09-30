module.exports =  [
  {
    name: "default",
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/modules/**/infra/typeorm/entities/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
    ],
    migrations: [
      `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/migrations/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
    ],
    cli: {
      migrationsDir: `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/shared/infra/typeorm/migrations`
    }
  }
]

