import { handleError, httpClient } from '@/services'

class FileApi {
    async downloadFile(id: string) {
        try {
            const res = await httpClient.get<Blob>(`/file/download/${id}`)

            // Create a temporary anchor element to trigger the download
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement("a");
            link.href = url;
            // Setting filename received in response
            link.setAttribute("download", 'filedownload');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return res
        } catch (error) {
            handleError(error, (res) => {
                throw new res.data.message()
            })
        }
    }
}

const fileApi = new FileApi()

export default fileApi