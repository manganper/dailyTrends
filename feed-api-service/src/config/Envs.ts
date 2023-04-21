// The port to open for the server
export const PORT = Number(process.env.PORT) || 3000;
// Limits the max notices per newspaper, default is 5
export const MAX_NEWSPAPER_NOTICES: number = Number(process.env.MAX_NEWSPAPER_NOTICES) || 5;
// Security header
export const SECURITY_HEADER = process.env.SECURITY_HEADER;
