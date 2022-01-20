export default function validateInfo(values) {
    let errors = {};
    if (!values.ten_loai_giay) {
        errors.ten_loai_giay = 'Vui lòng nhập tên loại giày';
    }
    if (!values.mo_ta) {
        errors.mo_ta = 'Vui lòng nhập mô tả loại giày';
    }
    if (!values.hinh_anh) {
        errors.hinh_anh = 'Vui lòng chọn hình ảnh';
    }

    return errors;
}