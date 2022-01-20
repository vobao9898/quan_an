import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        id: 0,
        ten_size: '',
        date_create: new Date(),
        date_update: new Date(),
    });

    function onChangeInput(e) {
        e.persist();
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
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
        onChangeInput,
        handleSubmit,
        data,
        setData,
        errors,
    };
};

export default useForm;