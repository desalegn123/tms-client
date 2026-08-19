import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

export interface EnrollmentStatusEvent {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Injectable({
  providedIn: 'root',
})
export class LiveSyncService {
  private platformId = inject(PLATFORM_ID);

  private connection: HubConnection | null = null;

  private eventsSubject = new Subject<EnrollmentStatusEvent>();

  // Expose events as an Observable.
  // Other Angular classes can subscribe to this,
  // but they cannot directly call next() on the Subject.
  events$ = this.eventsSubject.asObservable();

  // Current SignalR connection state.
  connectionState = signal<'connected' | 'reconnecting' | 'disconnected'>('disconnected');

  connect(): void {
    // Prevent creating multiple SignalR connections.
    if (this.connection) {
      return;
    }

    // SignalR WebSocket connections require the browser.
    // Skip connection creation during SSR/server rendering.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Create the SignalR connection.
    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/tms')
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    // Listen for enrollment status updates sent by the backend.
    this.connection.on(
      'ReceiveEnrollmentStatusUpdated',
      (enrollmentId: string, status: 'Pending' | 'Approved' | 'Rejected') => {
        console.log('SignalR event received:', {
          enrollmentId,
          status,
        });
        this.eventsSubject.next({
          id: enrollmentId,
          status,
        });
      },
    );

    // SignalR is trying to reconnect.
    this.connection.onreconnecting(() => {
      this.connectionState.set('reconnecting');
    });

    // SignalR successfully reconnected.
    this.connection.onreconnected(() => {
      this.connectionState.set('connected');
    });

    // SignalR connection has been closed.
    this.connection.onclose(() => {
      this.connectionState.set('disconnected');
    });

    // Start the SignalR connection.
    this.connection
      .start()
      .then(() => {
        this.connectionState.set('connected');
      })
      .catch((err) => {
        console.error('SignalR connection error:', err);
        this.connectionState.set('disconnected');
      });
  }
}
