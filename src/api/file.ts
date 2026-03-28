import httpClient from "./httpClient";

type FileEntry = {
    name: string;
    type: string;
    size: string;
    modified: string;
};

type FilesResponse = {
    header: string[];
    data: FileEntry[];
};

export async function getFiles(): Promise<FilesResponse> {
    try {
        const fileData = await httpClient.get('/files/');
        return fileData as FilesResponse;
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
}
