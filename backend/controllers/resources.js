const db = require('../server'); // Adjust path as needed

exports.addResource = async (req, res) => {
    try {
        const resource = await db.Resource.create(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getResources = async (req, res) => {
    try {
        const resources = await db.Resource.findAll();
        res.status(200).json(resources);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const resource = await db.Resource.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        await db.Resource.destroy({ where: { id: req.params.id } });
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
