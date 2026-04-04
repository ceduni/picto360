export interface NotificationClient {
  id: string;
  write: (data: string) => void;
}

class NotificationHubService {
  private clientsByScope = new Map<string, Set<NotificationClient>>();

  addClient(scope: string, client: NotificationClient) {
    const clients = this.clientsByScope.get(scope) ?? new Set<NotificationClient>();
    clients.add(client);
    this.clientsByScope.set(scope, clients);
  }

  removeClient(scope: string, client: NotificationClient) {
    const clients = this.clientsByScope.get(scope);
    if (!clients) {
      return;
    }

    clients.delete(client);

    if (clients.size === 0) {
      this.clientsByScope.delete(scope);
    }
  }

  emit(scope: string, event: string, data: unknown) {
    const clients = this.clientsByScope.get(scope);
    if (!clients || clients.size === 0) {
      return;
    }

    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    clients.forEach((client) => client.write(payload));
  }
}

let notificationHubService: NotificationHubService | null = null;

export const getNotificationHubService = () => {
  if (!notificationHubService) {
    notificationHubService = new NotificationHubService();
  }

  return notificationHubService;
};
