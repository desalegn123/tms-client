import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID, signal, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  HubConnection,
  HubConnectionBuilder
} from "@microsoft/signalr";

export interface EnrollmentStatusEvent {
  id: string;
  status: "Pending" | "Approved" | "Rejected";
}

@Injectable({
  providedIn: "root"
})
export class LiveSyncService {
  private platformId = inject(PLATFORM_ID);

  private connection: HubConnection | null = null;

  private eventsSubject = new Subject<EnrollmentStatusEvent>();

  // Expose events as an observable — the store will subscribe to this
  events$: Observable<EnrollmentStatusEvent> =
    this.eventsSubject.asObservable();

  // Connection state signal for UI status feedback
  connectionState = signal<
    "connected" | "reconnecting" | "disconnected"
  >("disconnected");

  connect() {
    // Guard against duplicate connections if called more than once
    if (this.connection) return;

    // SignalR uses WebSocket which only exists in browsers, not on the Node.js server.
    // If SSR is enabled, skip it.
    if (!isPlatformBrowser(this.platformId)) return;

    // Same hub URL and reconnect strategy
    this.connection = new HubConnectionBuilder()
      .withUrl("/hubs/tms")
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    // Event name matches the ITmsHubClient method on the backend.
    this.connection.on(
      "ReceiveEnrollmentStatusUpdated",
      (
        enrollmentId: string,
        status: "Pending" | "Approved" | "Rejected"
      ) => {
        this.eventsSubject.next({
          id: enrollmentId,
          status
        });
      }
    );

    this.connection.onreconnecting(() =>
      this.connectionState.set("reconnecting")
    );

    this.connection.onreconnected(() =>
      this.connectionState.set("connected")
    );

    this.connection.onclose(() =>
      this.connectionState.set("disconnected")
    );

    this.connection
      .start()
      .then(() => this.connectionState.set("connected"))
      .catch((err: any) =>
        console.error("SignalR connection error:", err)
      );
  }
}