export class RewardsState {
  private _idCard: string;
  private _idTicket: string;
  cardSpecial: boolean;
  ticket: boolean;

  constructor() {
    this.cardSpecial = false;
    this.ticket = false;
  }

  toggleCardSpecial() {
    this.cardSpecial = !this.cardSpecial;
  }

  toggleTicket() {
    this.ticket = !this.ticket;
  }

  get isCardActive() {
    return this.cardSpecial;
  }

  get isTicketActive() {
    return this.ticket;
  }

  get idCard() {
    return this._idCard;
  }

  set idCard(id: string) {
    this._idCard = id;
  }

  set idTicket(id: string) {
    this._idTicket = id;
  }

  get idTicket() {
    return this._idTicket;
  }
}
