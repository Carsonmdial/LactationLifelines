const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../server'); // Adjust path as needed

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const owner = await db.Owner.findOne({ where: { email } });

    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    const isMatch = await bcrypt.compare(password, owner.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: owner.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
};