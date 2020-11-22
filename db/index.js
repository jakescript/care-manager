const { Sequelize } = require('sequelize');
const {STRING, UUID, UUIDV4, INTEGER} = Sequelize;

const conn = new Sequelize('pbSQL', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const User = conn.define("user", {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

const Med = conn.define("medication", {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    },
    dose: {
        type: INTEGER,
        allowNull: false
    }
});

Med.belongsTo(User);
User.hasMany(Med);

User.belongsTo(User, {as: "caretaker"});
User.hasMany(User, {foreignKey: "caretakerId", as: "patients"});

const seed = async () => {
    await conn.sync({force: true});
    const [doc, jake, flood, ryan, advil, adderall, inhaler] = await Promise.all([
        User.create({name: "Dr Doctor"}),
        User.create({name: "jake"}),
        User.create({name: "flood"}),
        User.create({name: "ryan"}),
        Med.create({name: "advil", dose: 5}),
        Med.create({name: "adderall", dose: 15}),
        Med.create({name: "inhaler", dose: 2})
    ])

    advil.userId = jake.id
    adderall.userId = ryan.id
    inhaler.userId = flood.id
    jake.caretakerId = doc.id
    ryan.caretakerId = doc.id
    flood.caretakerId = doc.id
    await Promise.all([
        await jake.save(),
        await ryan.save(),
        await flood.save(),
        await advil.save(),
        await adderall.save(),
        await inhaler.save()
    ])
}

module.exports = {
    conn,
    seed,
    models: {
        User,
        Med
    }
}