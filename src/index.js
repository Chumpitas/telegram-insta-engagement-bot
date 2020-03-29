const BotProxy = require('./bot-proxy');
const EngagementManager = require('./engagementManager');
const { managerModes } = require('./constants');

const token = '1065625410:AAFsainxNkce_GwKDEHJpRLLeVyoxQ3b7ss';
const groupChatId = '420310989';

const botProxy = new BotProxy(token, groupChatId, true);

const engagementManager = new EngagementManager(
    (text) => botProxy.sendMessageToGroup(text), //send to group
    (text) => botProxy.sendMessageToGroup(text, true), //send to group as HTML
    true //debug mode
);

botProxy.subscribeOnEvent('message', (msg) => {
    if (engagementManager.currentMode === managerModes.COLLECTING && msg.text.startsWith('@')) {
        let text = msg.text.split(' ')[0];
        engagementManager.addCandidate(text);
    }
})

botProxy.onText(/\/chatId/, (msg) => {
    const chatId = msg.chat.id;
    botProxy.sendMessage(chatId, 'chatId: ' + chatId);
})

engagementManager.start();