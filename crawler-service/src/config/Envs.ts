// The port to open for the server
export const PORT: number = Number(process.env.PORT) || 3000;
// Security header
export const SECURITY_HEADER: string = process.env.SECURITY_HEADER;
// The URL to send request to the notice API
export const NOTICE_API: string = process.env.NOTICE_API || 'http://localhost:3000';
