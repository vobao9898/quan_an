import { useState, useEffect } from 'react';

const useForm = (callback, validate, apiUpload) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        id: 0,
        ten_mau_sac: '',
        hinh_anh: '',
    });

    function onChangeInput(e) {
        e.persist();
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }

    function onUpload() {
        apiUpload
            .upload(file)
            .then((response) => {
                if (response.status === 201) {
                    setData((data) => ({...data, hinh_anh: response.data.url }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // const { date_create } = data;
        // setData((data) => ({
        //     ...data,
        //     trang_thai: 1,
        //     date_create: Moment(date_create).format('YYYY-MM-DD HH:mm'),
        // }));
        setErrors(validate(data));
        setIsSubmitting(true);
    }

    function handleChange(event) {
        event.persist();
        setFile(event.target.files[0]);
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        onChangeInput,
        handleSubmit,
        data,
        setData,
        errors,
        file,
        setFile,
        handleChange,
        onUpload,
    };
};

export default useForm;