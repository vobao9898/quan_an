export default function validateInfo(values) {
    let errors = {};
    const date1 = new Date(values.ngay_bat_dau);
    const date2 = new Date(values.ngay_ket_thuc);
    if (date1 === date2) {
        errors.date_KM = 'Vui lòng chọn thời gian khuyến mãi';
    }
    if (!values.ten_khuyen_mai) {
        errors.ten_khuyen_mai = 'Vui lòng nhập tên khuyến mãi';
    }
    if (!values.mo_ta) {
        errors.mo_ta = 'Vui lòng nhập mô tả khuyến mãi';
    }
    if (!values.phan_tram) {
        errors.phan_tram = 'Vui lòng nhập phần trăm khuyến mãi';
    }
    return errors;
}