const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

// Define all your event constants here for reuse
const EVENTS = {
    TASK: {
        CREATED: 'TASK_CREATED',
        UPDATED: 'TASK_UPDATED',
        DELETED: 'TASK_DELETED',
    },
    COMMENT: {
        ADDED: 'COMMENT_ADDED',
    },
    NOTIFICATION: {
        NEW: 'NEW_NOTIFICATION',
    },
    ACTIVITY: {
        LOGGED: 'ACTIVITY_LOGGED',
    }
};

module.exports = { pubsub, EVENTS };
