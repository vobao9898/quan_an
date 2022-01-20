export default function validateInfo(values) {
    let errors = {};
    if (!values.ten_mau_sac) {
        errors.ten_mau_sac = 'Vui lòng nhập màu sắc cần thêm';
    }
    if (!values.hinh_anh) {
        errors.hinh_anh = 'Vui lòng màu sắc cần thêm';
    }

    return errors;
}