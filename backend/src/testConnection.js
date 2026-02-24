const db = require('./dB_config/config.js')

async function testDb() {
    try {
        const [rows] = await db.execute("SELECT * from trades");
            console.log(rows);
            // process.exit();
    } catch (error) {
        console.error(error);
        
    }
}
testDb();


module.exports = testDb;