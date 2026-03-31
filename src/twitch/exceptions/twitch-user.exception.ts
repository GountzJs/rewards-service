export class TwitchUserException extends Error {
  constructor() {
    super('Twitch user not found');
  }
}
