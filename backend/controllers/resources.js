const db = require('../server'); // Adjust path as needed

exports.addResource = async (req, res) => {
    try {
        const resource = await db.resource.create(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getResources = async (req, res) => {
    try {
        const resources = await db.resource.findAll();
        res.status(200).json(resources);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const resource = await db.resource.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        await db.resource.destroy({ where: { id: req.params.id } });
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
