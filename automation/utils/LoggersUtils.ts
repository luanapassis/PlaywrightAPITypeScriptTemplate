export class LoggerUtils {
    static logTitle(title: string) {
      console.log(`\n🔹 ${title.toUpperCase()}\n`);
    }
  
    static logJson(label: string, data: any) {
      console.log(`📌 ${label}:\n` + JSON.stringify(data, null, 2));
    }
  
    static logPayloadRequest(label: string, payload: any) {
      this.logTitle(`Request - ${label}`);
      this.logJson('Payload', payload);
    }
  
    static async logResponse(label: string, response: Response | { json: () => Promise<any>; status: () => number }) {
      const status = typeof response.status === 'function' ? response.status() : response.status || 0;
      const body = await response.json();
      this.logTitle(`Response - ${label}`);
      console.log(`📎 Status: ${status}`);
      this.logJson('Body', body);
    }

    static logParametersRequest(label: string, query: Record<string, any>, fullUrl?: string) {
        console.log(`\n🔹 REQUEST - ${label.toUpperCase()}`);    
        if (fullUrl) {
          console.log(`🌐 URL: ${fullUrl}`);
        }    
      }

    
  }
  