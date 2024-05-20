const db = require('../models');
const MailChimp = require('mailchimp-api-v3');
const mailchimp = new MailChimp(process.env.MAILCHIMP_API_KEY);
const crypto = require('crypto');

exports.addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        // Check MailChimp status
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        let mailchimpResponse;
        try {
            mailchimpResponse = await mailchimp.get(`/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`);
            if (mailchimpResponse.status === 'unsubscribed') {
                // Resubscribe user in MailChimp
                await mailchimp.patch(`/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`, {
                    status: 'subscribed'
                });
            } else if (mailchimpResponse.status !== 'subscribed') {
                // If the status is neither subscribed nor unsubscribed, update it to subscribed
                await mailchimp.put(`/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`, {
                    email_address: email,
                    status: 'subscribed'
                });
            }
        } catch (error) {
            if (error.status === 404) {
                // If the user is not found in MailChimp, add them
                mailchimpResponse = await mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
                    email_address: email,
                    status: 'subscribed'
                });
            } else {
                throw error;
            }
        }

        console.log('Mailchimp Response:', mailchimpResponse);

        // Add to database
        const [subscriber, created] = await db.Subscriber.findOrCreate({
            where: { email },
            defaults: {
                email,
                total_subscriptions: 1,
                total_subscription_time: 'P0D',  // Default value
                active: true
            }
        });

        if (!created) {
            if (subscriber.active) {
                return res.status(400).json({ message: 'You are already subscribed.' });
            }
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
        console.error('Error adding subscriber:', err);
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

        // Update MailChimp status
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        await mailchimp.patch(`/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHash}`, {
            status: active ? 'subscribed' : 'unsubscribed'
        });

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

            if (lastSubscription) {
                const now = new Date();
                lastSubscription.unsubscribed_at = now;

                // Calculate subscription length in milliseconds
                const subscriptionLengthMs = now - new Date(lastSubscription.subscribed_at);
                const subscriptionLengthDays = (subscriptionLengthMs / (1000 * 60 * 60 * 24)).toFixed(2);  // Get fractional days
                lastSubscription.subscription_length = `P${subscriptionLengthDays}D`;

                // Update the total_subscription_time
                const totalSubscriptionTime = addDurations(subscriber.total_subscription_time, lastSubscription.subscription_length);
                subscriber.total_subscription_time = totalSubscriptionTime;

                await lastSubscription.save();
            }
        }

        await subscriber.save();
        res.status(200).json(subscriber);
    } catch (err) {
        console.error('Error updating subscriber status:', err);
        res.status(400).json({ error: err.message });
    }
};

const addDurations = (duration1, duration2) => {
    const parseDuration = (duration) => {
        const regex = /P(?:(\d+(\.\d+)?)D)?/;
        const matches = duration.match(regex);
        return matches ? parseFloat(matches[1] || '0') : 0;
    };

    const totalDays = parseDuration(duration1) + parseDuration(duration2);
    return `P${totalDays.toFixed(2)}D`;  // Ensure the result is a string in ISO 8601 format with two decimal places
};
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await db.Subscriber.findAll();
        res.status(200).json(subscribers);
    } catch (err) {
        console.error('Error getting subscribers:', err);
        res.status(400).json({ error: err.message });
    }
};
