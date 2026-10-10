import Notification from '../models/Notification.js';

export const createNotification = async ({ user, title, message, type = 'INFO', link }) => {
  try {
    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      link,
    });
    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};
