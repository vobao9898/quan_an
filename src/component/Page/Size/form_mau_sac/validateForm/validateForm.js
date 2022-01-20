export default function validateInfo(values) {
    let errors = {};
    if (!values.ten_size) {
        errors.ten_size = 'Vui lòng nhập size giày cần thêm';
    }

    return errors;
}