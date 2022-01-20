import { useState, useEffect } from 'react';
import Moment from 'moment';
const useForm = (callback, validate, apiUpload) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        id: 0,
        ten_loai_giay: '',
        mo_ta: '',
        trang_thai: 1,
        hinh_anh: '',
        date_create: new Date(),
        date_update: new Date(),
    });

    function handleChange(event) {
        event.persist();
        setFile(event.target.files[0]);
    }

    function onUpload() {
        apiUpload
            .upload(file)
            .then((response) => {
                if (response.status === 201) {
                    setData({...data, hinh_anh: response.data.url });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onChangeInput(e) {
        e.persist();
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }

    function onchangeSelect(e) {
        e.persist();
        setData((data) => ({
            ...data,
            trang_thai: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { date_create, date_update } = data;
        setData((data) => ({
            ...data,
            trang_thai: 1,
            date_create: Moment(date_create).format('YYYY-MM-DD HH:mm'),
            date_update: Moment(date_update).format('YYYY-MM-DD HH:mm'),
        }));
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
    };
};

export default useForm;