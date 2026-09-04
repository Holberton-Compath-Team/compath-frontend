export interface Ticket {
  id: number;
  title: string;
  description: string;
  department: string;
  status: string;
  // Backend priority enum-u hələ Swagger-də sənədləşdirilməyib (FAZA G) — dəqiq
  // dəyərlər gələndə union type-a çevriləcək. Optional, çünki köhnə ticket-lərdə yoxdur.
  priority?: string;
  // Backend hələ iki formatı qarışıq qaytarır (köhnə ticket-lər: created_at,
  // yeni: createdAt) — sabitləşənə qədər hər ikisi optional saxlanılır.
  created_at?: string;
  createdAt?: string;
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
  priority?: string;
  attachedFiles?: string[];
}

export interface CreateTicketResponse {
  message: string;
  status: string;
}

/** Unverified: backend lokal işə düşməyib, Swagger (/api/docs) hazır olanda sahə adları təsdiqlənməlidir. */
export interface TicketMessage {
  id: number;
  ticket_id: number;
  sender: string;
  sender_role: "student" | "admin";
  message: string;
  created_at: string;
}
