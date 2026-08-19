export interface Ticket {
  id: number;
  title: string;
  description: string;
  department: string;
  status: string;
  created_at: string;
}

export interface AdminTicket extends Ticket {
  student: {
    fullname: string;
    email: string;
  };
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  department: string;
}

export interface CreateTicketResponse {
  message: string;
  status: string;
}
