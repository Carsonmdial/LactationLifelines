// scripts/createOwner.js
const bcrypt = require('bcryptjs');
const db = require('../models'); // Adjust the path as needed

async function createOwner() {
    try {
        const hashedPassword = await bcrypt.hash(process.env.OWNER_PASSWORD, 10);
        await db.owner.create({
            name: process.env.OWNER_NAME,
            email: process.env.OWNER_EMAIL,
            password: hashedPassword,
        });
        console.log('Owner created successfully');
    } catch (error) {
        console.error('Error creating owner:', error);
    }
}

createOwner();
