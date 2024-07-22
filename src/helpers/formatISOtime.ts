export const formatISOtime = (isoTime: string) => {
    const date = new Date(isoTime);

    // Lấy các phần ngày, tháng, năm
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng từ 0-11 nên cần +1
    const day = date.getUTCDate().toString().padStart(2, '0');

    // Ghép lại thành định dạng mong muốn
    const readableDate = `${year}-${month}-${day}`;

    return readableDate;
}