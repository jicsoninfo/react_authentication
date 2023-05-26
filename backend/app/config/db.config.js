module.exports = {
    HOST: "localhost",
    USER:"root",
    PASSWORD: "Info@1234",
    DB: "07_inertia",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}