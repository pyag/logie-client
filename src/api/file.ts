import httpClient from "./httpClient";

export type FileEntry = {
    file_id: string,
    name: string;
    type: string;
    size: string;
    hidden: boolean;
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

export async function uploadChunk(formData: FormData): Promise<any> {
    try {
        const response = await httpClient.post('/upload/chunk/', null, formData);
        return response;
    } catch (error) {
        console.error("Error uploading chunk:", error);
        throw error;
    }
}

export async function downloadFile(fileId: string): Promise<Blob> {
    try {
        const blob = await httpClient.getBlob(`/download/${fileId}`);
        return blob;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
}

export async function hideFile(fileId: string): Promise<any> {
    try {
        const response = await httpClient.post(`/hide/${fileId}`, null);
        return response;
    } catch (error) {
        console.error("Error hiding file:", error);
        throw error;
    }
}
