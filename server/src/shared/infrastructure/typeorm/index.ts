import ormConfig from "../../../../ormconfig";

const ConnectDB = () => {
    ormConfig.initialize()
    .then(() => {
        console.log("DB has been initialized!");
    })
    .catch((err) => {
        console.error("Error during DB initialization", err);
    });
}

export default ConnectDB;