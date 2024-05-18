const db = require('../server'); // Adjust path as needed
const MailChimp = require('mailchimp-api-v3');
const mailchimp = new MailChimp('your_mailchimp_api_key');

exports.addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        // Add to MailChimp
        await mailchimp.post('/lists/your_list_id/members', {
            email_address: email,
            status: 'subscribed'
        });

        // Add to database
        const [subscriber, created] = await db.Subscriber.findOrCreate({
            where: { email },
            defaults: { email, total_subscriptions: 1, active: true }
        });

        if (!created) {
            // Update if already exists
            subscriber.total_subscriptions += 1;
            subscriber.active = true;
            await subscriber.save();
        }

        // Add to subscription history
        await db.SubscriptionHistory.create({
            subscriber_id: subscriber.subscriber_id,
            subscribed_at: new Date()
        });

        res.status(201).json(subscriber);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateSubscriberStatus = async (req, res) => {
    try {
        const { email, active } = req.body;
        const subscriber = await db.Subscriber.findOne({ where: { email } });

        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        subscriber.active = active;
        await subscriber.save();

        // Update subscription history
        if (active) {
            await db.SubscriptionHistory.create({
                subscriber_id: subscriber.subscriber_id,
                subscribed_at: new Date()
            });
        } else {
            const lastSubscription = await db.SubscriptionHistory.findOne({
                where: { subscriber_id: subscriber.subscriber_id },
                order: [['subscribed_at', 'DESC']]
            });
            lastSubscription.unsubscribed_at = new Date();
            
            // Calculate subscription length in ISO 8601 format
            const subscriptionLength = new Date() - new Date(lastSubscription.subscribed_at);
            lastSubscription.subscription_length = `P${subscriptionLength}D`;

            await lastSubscription.save();
        }

        res.status(200).json(subscriber);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await db.Subscriber.findAll();
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
