const db = require('../server'); // Adjust path as needed

exports.getEngagement = async (req, res) => {
    try {
        // Average Session Duration
        const sessions = await db.session.findAll();
        const sessionDurations = sessions.map(session => {
            const startTime = new Date(session.start_time);
            const endTime = new Date(session.end_time);
            return (endTime - startTime) / 1000; // in seconds
        });
        const averageSessionDuration = sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length;

        // Pages per Session
        const totalPageViews = await db.page_view.count();
        const totalSessions = await db.session.count();
        const pagesPerSession = totalPageViews / totalSessions;

        // Bounce Rate
        const singlePageSessions = await db.session.findAll({
            include: [{
                model: db.page_view,
                where: { session_id: db.Sequelize.col('session.session_id') },
                required: true,
                attributes: [],
                having: db.Sequelize.literal('COUNT(*) = 1')
            }]
        });
        const bounceRate = singlePageSessions.length / totalSessions;

        // Exit Rate
        const pageViews = await db.page_view.findAll();
        const exitCounts = {};
        pageViews.forEach(view => {
            if (!exitCounts[view.page_url]) {
                exitCounts[view.page_url] = { exits: 0, views: 0 };
            }
            exitCounts[view.page_url].views += 1;
        });
        sessions.forEach(session => {
            const lastPageView = pageViews.filter(view => view.session_id === session.session_id).pop();
            if (lastPageView) {
                exitCounts[lastPageView.page_url].exits += 1;
            }
        });
        const exitRates = {};
        for (const [page, counts] of Object.entries(exitCounts)) {
            exitRates[page] = counts.exits / counts.views;
        }

        // Clicks and Scroll Depth
        const totalClicks = await db.click_event.count();
        const averageScrollDepth = await db.page_view.findAll({
            attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('scroll_depth')), 'average_scroll_depth']]
        });

        // Returning Users
        const uniqueUsers = new Set();
        sessions.forEach(session => uniqueUsers.add(session.user_ip));
        const returningUsers = sessions.length - uniqueUsers.size;

        // New User Sessions
        const newUserSessions = await db.session.count({ where: { is_new_user: true } });

        // New Contacts & Subscribers
        const newSubscribers = await db.subscriber.count();

        res.status(200).json({
            averageSessionDuration,
            pagesPerSession,
            bounceRate,
            exitRates,
            totalClicks,
            averageScrollDepth: averageScrollDepth[0].dataValues.average_scroll_depth,
            returningUsers,
            newUserSessions,
            newSubscribers
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
