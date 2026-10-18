export interface Ticket {
  // GET /tickets format keçidindədir: köhnə ticket-lər `id`, yeni (Firestore)
  // ticket-lər `ticketId` qaytarır — sabitləşənə qədər hər ikisi optional,
  // oxuma zamanı @/utils/ticket->getTicketId ilə birləşdirilir. String, çünki
  // Firestore id-ləri ədəd olmaya bilər (bax İŞ 2 — id uyğunsuzluğu düzəlişi).
  id?: string;
  ticketId?: string;
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

/**
 * GET /api/tickets/all format keçidindədir: bəzi ticket-lər köhnə (`id` + `student`
 * obyekti), bəziləri yeni (`ticketId` + `authorName`) formatda gəlir — hər ikisi
 * optional saxlanır, oxuma zamanı @/utils/admin-ticket köməkçiləri ilə birləşdirilir.
 */
export interface AdminTicket extends Omit<Ticket, "id"> {
  id?: string;
  ticketId?: string;
  authorName?: string;
  student?: {
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

/**
 * Unverified: backend lokal işə düşməyib, Swagger (/api/docs) hazır olanda sahə
 * adları təsdiqlənməlidir. `ticket_id`/`ticketId` ikisi də optional saxlanılır —
 * Ticket/AdminTicket-dəki eyni köhnə/yeni format keçidi burada da gözlənilir.
 */
export interface TicketMessage {
  id: string;
  ticket_id?: string;
  ticketId?: string;
  sender: string;
  sender_role: "student" | "admin";
  message: string;
  created_at: string;
}

export interface AnonymousTicketPayload {
  title: string;
  description: string;
  department: string;
  authorName: string;
  priority?: string;
  attachedFiles: string[];
}

// POST /tickets/anonymous doğrulanmış cavab forması (canlı backend ilə
// yoxlanılıb) — trackingCode üst səviyyədədir, uğur ekranı yalnız bunu
// istifadə edir.
export interface AnonymousTicketResponse {
  message: string;
  ticketId: string;
  trackingCode: string;
}

/**
 * Unverified: GET /track/<code> test zamanı messages həmişə boş qayıtdı,
 * element sahələrinin dəqiq case-i doğrulanmayıb — qalan bütün cavab tam
 * camelCase olduğu üçün bu fərz olunur.
 */
export interface TrackingMessage {
  id: string;
  sender: string;
  senderRole: "student" | "admin";
  message: string;
  createdAt: string;
}

// GET /track/<code> doğrulanmış cavab forması (canlı backend ilə yoxlanılıb)
// — flat (wrap olunmamış), backend "department" ilə yanaşı dublikat
// "category" sahəsi də qaytarır.
export interface TrackingResult {
  trackingCode: string;
  title: string;
  description: string;
  department: string;
  category?: string;
  status: string;
  priority?: string;
  createdAt?: string;
  attachedFiles?: string[];
  messages: TrackingMessage[];
}
