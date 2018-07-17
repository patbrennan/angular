// Angular Service: No import or decorator. It's just a plain class definition.
export class LoggingService {
  logStatusChange(status: string) {
    console.log(`Server status changed. New status: ${status}`);
  }
}