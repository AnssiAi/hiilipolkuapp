export const ping = async (): Promise<string> => {
    const response = await fetch('api/health/ping');
    const data: string = await response.text()
    return data;
}