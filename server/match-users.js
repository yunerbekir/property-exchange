const db = require('./db/index');
const uuidv1 = require('uuid/v1');

module.exports = async () => {
    await db.query(`TRUNCATE TABLE ${db.tableNames.matches}`);
    const { rows: activeUsers } = await db.query(`
            SELECT * FROM ${db.tableNames.users}
            WHERE isactive=true
        `);

    for (let i = 0; i < activeUsers.length - 1; i++) {
        for (let j = i + 1; j < activeUsers.length; j++) {
            if (activeUsers[i].id !== activeUsers[j].id) {
                const myPropMatch = findMatch(activeUsers[i], activeUsers[j]);
                const oppositePropMatch = findMatch(activeUsers[j], activeUsers[i]);

                if (myPropMatch && oppositePropMatch) {
                    await db.query(`INSERT INTO ${db.tableNames.matches}(id, userids, configuration) VALUES($1, $2, $3)`, [
                        uuidv1(),
                        [myPropMatch.destination.id, oppositePropMatch.destination.id],
                        [
                            {
                                'from': myPropMatch.destination.id,
                                'to': oppositePropMatch.destination.id,
                            },
                            {
                                'from': oppositePropMatch.destination.id,
                                'to': myPropMatch.destination.id,
                            },
                        ]
                    ]);
                }
            }
        }
    }
};

function findMatch(origin, destination) {
    const destinationMatch = destination.requestedproperties.find((rp) => {
        return rp.address === origin.currentproperty.address;
    });

    if (destinationMatch) {
        if (destinationMatch.size <= origin.currentproperty.size && destinationMatch.rent >= origin.currentproperty.rent) {
            return { destination, destinationMatch };
        }
    }

    return false;
}
