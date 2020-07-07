interface User {
  id: number;
  name: string;
}

interface Ticket {
  id: number;
  description: string;
  assigneeId: number | null;
  completed: boolean;
}

type NewTicket = Pick<Ticket, "description">;
type AssignTicket = Pick<Ticket, "id" | "assigneeId">;
type CompleteTicket = Pick<Ticket, "id" | "completed">;

const randomize = () => Math.random() * 4000;

const randomWait = () =>
  new Promise(resolve => {
    setTimeout(resolve, randomize());
  });

export class TicketBackend {
  private _tickets: Ticket[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    }
  ];

  private _users: User[] = [
    { id: 111, name: "Julie" },
    { id: 222, name: "Hank" },
    { id: 333, name: "Al" }
  ];

  async tickets() {
    await randomWait();
    return this._tickets;
  }

  async users() {
    await randomWait();
    return this._users;
  }

  async ticket(id: Ticket["id"]) {
    await randomWait();
    return this._tickets.find(t => t.id === id);
  }

  async user(id: User["id"]) {
    await randomWait();
    return this._users.find(u => u.id === id);
  }

  async newTicket({ description }: NewTicket) {
    await randomWait();

    if (!description)
      throw new Error("Ticket can only be created with a valid description");

    const newTicket: Ticket = {
      id: Math.max(...this._tickets.map(t => t.id)) + 1,
      description,
      assigneeId: null,
      completed: false
    };
    this._tickets.push(newTicket);
    return newTicket;
  }

  async assign({ id: ticketId, assigneeId }: AssignTicket) {
    await randomWait();

    const matchTicket = this._tickets.find(t => t.id === ticketId);
    const matchUser = this._users.find(u => u.id === assigneeId);

    if (!matchTicket) throw new Error(`Cannot find ticket ${ticketId}`);
    if (!matchUser) throw new Error(`Cannot find user ${assigneeId}`);

    matchTicket.assigneeId = assigneeId;

    return matchTicket;
  }

  async complete({ id: ticketId, completed }: CompleteTicket) {
    await randomWait();

    const matchTicket = this._tickets.find(t => t.id === ticketId);
    if (!matchTicket) throw new Error(`Cannot find ticket ${ticketId}`);

    matchTicket.completed = completed;

    return matchTicket;
  }
}
