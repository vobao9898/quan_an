import { useState, useEffect } from 'react';

const useForm = (callback, validate, apiUpload) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        id: 0,
        ngay_bat_dau: new Date(),
        ngay_ket_thuc: new Date(),
        ten_khuyen_mai: '',
        mo_ta: '',
        phan_tram: '',
        hinh_anh: '',
        trang_thai: 1,
        date_create: new Date(),
        date_update: new Date(),
    });

    const [addCTKM, setAddCTKM] = useState([]);
    const [deleteCTKM, setDeleteCTKM] = useState([]);

    const [khuyenmai, setKhuyenmai] = useState([]);

    function handleChange(e) {
        if (e.target.files) {
            setFile(e.target.files);
        }
    }

    function onUpload() {
        apiUpload
            .uploadMultiple(file)
            .then((response) => {
                let h = [];

                if (response.status === 201) {
                    for (var i = 0; i < response.data.url.length; i++) {
                        h.push(response.data.url[i].filename);
                    }
                    setData((data) => ({...data, hinh_anh: h.toString() }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onChangeInput(e) {
        e.persist();
        if (e.target.name === 'phan_tram' && e.target.value !== isNaN) {
            setData((data) => ({
                ...data,
                phan_tram: parseInt(e.target.value),
            }));
        } else {
            setData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    }

    function onchangeSelect(e) {
        setData((data) => ({
            ...data,
            trang_thai: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(data));
        setIsSubmitting(true);
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);
    return {
        onUpload,
        onChangeInput,
        onchangeSelect,
        handleChange,
        handleSubmit,
        file,
        data,
        setData,
        errors,
        khuyenmai,
        setKhuyenmai,
        addCTKM,
        setAddCTKM,
        deleteCTKM,
        setDeleteCTKM,
    };
};

export default useForm;