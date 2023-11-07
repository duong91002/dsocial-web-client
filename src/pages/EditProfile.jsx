import React, { useMemo, useState } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import ProfileServices from '../services/ProfileService';
import getDate from '../utils/getDate';
import getImage from '../utils/getImage';
import { GoPencil } from 'react-icons/go';
import { uploadServer } from '../utils/axiosClient';
const validateSchema = Yup.object({
    bio: Yup.string(),
    name: Yup.string().required('Vui lòng nhập tên.').max(50, 'Tên không quá 50 kí tự.'),
    other_name: Yup.string(),
    birthday: Yup.date().required('Vui lòng chọn ngày sinh nhật.'),
    address: Yup.string(),
});

const EditProfile = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const { user } = useSelector((state) => state.user);

    const [coverImage, setCoverImage] = useState(null);
    const [avatarImage, setAvatarImage] = useState(null);

    const previewImage = useMemo(() => {
        if (!coverImage) {
            return user.cover_image
                ? getImage(user.cover_image)
                : 'https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D';
        }

        return URL.createObjectURL(coverImage);
    }, [coverImage]);

    const previewAvatar = useMemo(() => {
        if (!avatarImage) {
            return getImage(user.avatar);
        }

        return URL.createObjectURL(avatarImage);
    }, [avatarImage]);
    // const { mutate, isPending } = useMutation({
    //     mutationFn: ProfileServices.updateProfile,
    //     onSuccess: (data) => {
    //         Swal.fire('Thành công!', 'Đã thay đổi thông tin', 'success');
    //     },
    //     onError: (error) => {
    //         if (error?.message) {
    //             return Swal.fire('Thất bại!', error.message, 'error');
    //         }
    //         Swal.fire('Thất bại!', 'Có lỗi xảy ra, vui lòng thử lại sau vài phút!', 'error');
    //     },
    // });
    const handleSubmit = async (values) => {
        let cover_image = user.cover_image;
        let avatar = user.avatar
        //TODO
        if (coverImage) {
            cover_image = await uploadServer(coverImage)
        }

        if (avatarImage) {
            avatar = await uploadServer(avatarImage)
        }

        const payload = { ...values, cover_image, avatar };
        console.log('submit', payload);
        // mutate(payload);
    };

    return (
        <div>
            <Formik
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                initialValues={{
                    bio: user.bio || '',
                    name: user.name || '',
                    other_name: user.other_name || '',
                    birthday: user.birthday != null ? getDate(user.birthday) : null,
                    address: user.address || '',
                    cover_image: user.cover_image || '',
                }}
                validationSchema={validateSchema}
            >
                {({ handleSubmit }) => (
                    <>
                        <div className="relative">
                            <div className="flex items-center justify-center">
                                <input
                                    type="file"
                                    className="absolute"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    accept="image/*"
                                />
                                <img
                                    className="w-full h-auto aspect-video md:aspect-auto md:h-[250px] object-cover "
                                    src={previewImage}
                                />
                            </div>

                            <div className="absolute px-4 bottom-[-40px] left-0 right-0 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <img
                                            className="rounded-full w-[80px] h-[80px] border-primary border-2"
                                            src={previewAvatar}
                                            alt=""
                                        />
                                        <div className='absolute inset-0 rounded-full flex items-center justify-center bg-[rgba(0,0,0,0.6)]'>
                                            <label
                                                htmlFor="avatar"
                                                className="cursor-pointer text-white p-1 rounded-full"
                                            >
                                                <GoPencil />
                                            </label>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="avatar"
                                            onChange={(e) => setAvatarImage(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="">
                                        <h1 className="font-bold text-primary">Thành Đạt</h1>
                                        <p className="text-[#828486]">(datisekai)</p>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-sm md:btn-md btn-primary"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                        <div className="mt-[62px] px-4">
                            <div>
                                <h2 className="font-bold text-sm text-primary mb-1">Tiểu sử</h2>
                                <Field
                                    as="textarea"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Tiểu sử"
                                    name="bio"
                                ></Field>
                                <ErrorMessage name="bio" component="div" className="text-error text-sm" />
                            </div>

                            <div className="border-t mt-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold text-sm text-primary mb-1">Tên của bạn</p>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Tên của bạn"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-error text-sm" />
                                </div>

                                <div>
                                    <p className="font-bold text-sm text-primary mb-1">Biệt danh (tên gọi khác)</p>
                                    <Field
                                        type="text"
                                        placeholder="Biệt danh"
                                        name="otherName"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    <ErrorMessage name="otherName" component="div" className="text-error text-sm" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-primary mb-1">Ngày sinh nhật</p>
                                    <Field
                                        type="date"
                                        placeholder="Type here"
                                        className="input input-bordered w-full max-w-xs"
                                        name="birthday"
                                    />
                                    <ErrorMessage name="birthday" component="div" className="text-error text-sm" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-primary mb-1">Địa chỉ</p>
                                    <Field
                                        type="text"
                                        placeholder="Địa chỉ"
                                        name="address"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-error text-sm" />
                                </div>
                            </div>

                            <div className="py-4 mt-4 border-t">
                                <button
                                    className="btn btn-ghost btn-sm md:btn-md"
                                    onClick={() => setVisiblePassword(true)}
                                >
                                    Thay đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </Formik>

            {visiblePassword && (
                <ChangePasswordModal visible={visiblePassword} onClose={() => setVisiblePassword(false)} />
            )}
        </div>
    );
};

export default EditProfile;
