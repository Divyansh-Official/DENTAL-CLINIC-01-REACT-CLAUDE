import admin from "firebase-admin";

// Initialize Firebase Admin once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Escape sequences in env vars need to be unescaped
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
export default admin;

/*
  FIRESTORE DATA STRUCTURE
  ========================

  appointments/{appointmentId}
    patientName:     string
    patientPhone:    string
    patientEmail:    string
    service:         string
    date:            string  "2025-04-14"
    time:            string  "9:00 AM"
    notes:           string
    status:          "pending" | "confirmed" | "completed" | "no_show" | "cancelled" | "rescheduled"
    createdAt:       Timestamp
    updatedAt:       Timestamp
    reminderSent:    boolean  (24h reminder to patient)
    noShowNotified:  boolean  (doctor told to mark outcome)
    doctorNotes:     string   (doctor can add notes)
    rescheduledTo:   string?  (new appointmentId if rescheduled)
    rescheduledFrom: string?  (original appointmentId)

  slots/{date}             e.g. "2025-04-14"
    "9:00 AM":   "available" | "booked" | "blocked"
    "10:00 AM":  ...
    ...

  settings/clinic
    gracePeriodMinutes: 30    (after appt time, before no-show alert)
    workingHours: { start: "9:00 AM", end: "20:00" }
    blockedDates: string[]    (holidays, full days off)
*/
