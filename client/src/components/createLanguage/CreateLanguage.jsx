import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, message, Modal, Row, Tooltip, Typography, } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { createLanguages, editLanguages, getTranslationData } from '../../../api/AdminRequest';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createLanguages, editLanguages, getTranslationData } from '../../api/ApiRequests';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    // wrapperCol: {
    //   xs: {
    //     span: 24,
    //   },
    //   sm: {
    //     span: 16,
    //   },
    // },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function CreateLanguage({ edit }) {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state, 'state values');

    const initialValues = {
        addToContact: "Add to Contacts",
        about: "About Me",
        contact: "Contact Me",
        socialMedia: "Social Media",
        website: "Website",
        review: "Review",
        files: "Downloads",
        name: "Name",
        designation: "Designation",
        call: "Call",
        email: "Email",
        address: "Location",
        direction: "Direction",
        facebook: "Facebook",
        facebookText: "Follow me on Facebook",
        instagram: "Instagram",
        instagramText: "Follow me on Instagram",
        whatsApp: "WhatsApp",
        whatsAppText: "Follow me on WhatsApp",
        linkedIn: "LinkedIn",
        linkedInText: "Follow me on LinkedIn",
        x_twitter: "X(Twitter)",
        x_twitterText: "Follow me on X(Twitter)",
        youtube: "Youtube",
        youtubeText: "Follow me on Youtube",
        skype: "Skype",
        skypeText: "Follow me on Skype",
        tikTok: "TikTok",
        tikTokText: "Follow me on TikTok",
        companyProfile: "Company Profile",
        companyProfileText: "View Company Profile",
        downloadQR: "Download QR Code",
        addHomeScreen: "Add to Home Screen",
        snapChat: "SnapChat",
        snapChatText: "Follow me on SnapChat"

    }

    const [translations, setTranslations] = useState(initialValues);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'newKey') {
            setNewKey(value);
        } else if (name === 'newValue') {
            setNewValue(value);
        }
    };

    const handleAddTranslation = () => {
        setTranslations((prevTranslations) => ({
            ...prevTranslations,
            [newKey]: newValue,
        }));

        // Clear input fields after adding a translation
        setNewKey('');
        setNewValue('');
        handleCancelModal()
    };

    useEffect(() => {
        const translationKey = async () => {
            try {
                const { data } = await getTranslationData()
                // console.log(data);
                setTranslations(data?.translations)
            } catch (error) {

            }
        }
        translationKey()
    }, [])


    const onFinish = async (values) => {
        console.log('Form Values:', values);

        let id = state?._id
        try {
            const { data } = edit ? await editLanguages(id, values) : await createLanguages(values)
            // console.log(data);
            if (data.success) {
                // toast.success('New Language Created', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     theme: "dark",
                // });
                await message.success("New Language Created");
            } else if (data.update) {
                // toast.success('Updated Successfully', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     theme: "dark",
                // });
                await message.success("Updated Successfully");
            }
            setTimeout(() => {
                navigate('/languages')
            }, 3000)
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                // toast(error?.response?.data?.message)
                await message.error(error?.response?.data?.message);
            } else {

                // toast(error.message)
                await message.error(error.message);
            }
        }
    }

    const handleNewTranslation = () => {
        setIsModalOpen(true)
    }

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Title level={2}> <Link to={'/'}>Home/</Link> <Link to={'/languages'}>Languages/</Link> {edit ? 'Edit Language' : 'Create Language'}</Title>
                </Col>
            </Row>
            <div className='flex min-h-screen justify-center mt-14' >


                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={state ? state : ''}
                    style={{
                        // maxWidth: 600,
                        width: 600
                    }}
                    scrollToFirstError
                >
                    <div className='grid grid-cols-3 gap-2 ' >

                        <div>
                            <label htmlFor="" className='text-xl font-semibold'>Lanuage</label>
                            <Form.Item
                                name="language"
                                // label="E-mail"
                                className='mb-2'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Lanuage Name!',
                                    },
                                ]}
                            >

                                <Input placeholder='Language' className='py-2' />
                            </Form.Item>
                        </div>
                        <div>
                            <label htmlFor="" className='text-xl font-semibold'>Lanuage Code</label>
                            <Form.Item
                                name="languageCode"
                                // label="E-mail"
                                className='mb-2'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Lanuage Code',
                                    },
                                ]}
                            >

                                <Input placeholder='Lanuage Code' className='py-2' />
                            </Form.Item>
                        </div>
                        <div>
                            <label htmlFor="" className='text-xl font-semibold'>Flag Code</label>
                            <Form.Item
                                name="flagCode"
                                // label="E-mail"
                                className='mb-2'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Flag Code',
                                    },
                                ]}
                            >

                                <Input placeholder='Flag Code' className='py-2' />
                            </Form.Item>
                        </div>
                        {/* <div>
                        <label htmlFor="" className='text-xl font-semibold'>Type</label>
                        <Select
                            // defaultValue="lucy"
                            placeholder='Select the theme type '
                            value={themeType}
                            style={{
                                width: '100%',
                            }} f
                            // disabled={filterMaterialColor.length === 0 ? true : false}
                            size='large'
                            onChange={handleChangeThemeType}
                            options={themeTypes?.map((item) => ({
                                label: item.name,
                                value: item.value,
                            }))}
                        />
                        <p className='text-red-500'>{error.type}</p>
                        </div> */}

                    </div>
                    <div>
                        {Object.entries(translations).map(([key, value]) => (
                            <div key={key}>
                                <label htmlFor="" className='text-xl font-semibold'>{key} (Translation for : {value})</label>
                                <Form.Item
                                    // name={key}
                                    name={['languageDatas', key]}
                                    // label="E-mail"
                                    className='mb-2'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Lanuage!',
                                        },
                                    ]}
                                >

                                    <Input placeholder={`Translation for ${value}`} className='py-2' />
                                </Form.Item>
                            </div>
                        ))}
                    </div>

                    <Form.Item {...tailFormItemLayout} className='flex justify-center  mr-14'>
                        <div className='flex gap-3' >
                            {state?.languageCode === 'en' ?
                                <p className='bg-green-800 w-60 flex justify-center items-center cursor-pointer  my-5 text-white rounded-lg ' onClick={handleNewTranslation} >
                                    Add new Translation
                                </p>
                                : ''
                            }
                            <Button className='bg-blue-800 w-32  my-5 ' type="primary" htmlType="submit">
                                {edit ? 'Save' : ' Register'}
                            </Button>

                        </div>
                    </Form.Item>
                </Form>
            </div>
            <Modal open={isModalOpen} onCancel={handleCancelModal} closable={false} maskClosable={false} destroyOnClose={false}
                footer={[
                    <div className="flex justify-end">

                        <div className='flex gap-2'>
                            <Button key="back" onClick={handleCancelModal}>
                                Cancel
                            </Button>
                            {newKey && newValue ?
                                <Button key="submit" className='bg-blue-800' type="primary" onClick={handleAddTranslation}>
                                    Add
                                </Button>
                                :
                                <Tooltip placement="top" title="Please fill the fields!">
                                    <div>
                                        <Button className='bg-blue-800' type="primary" disabled >
                                            Add
                                        </Button>
                                    </div>
                                </Tooltip>
                            }
                        </div>
                    </div>
                ]} >
                <div>
                    <div className="grid gap-5 md:grid-cols-2" >
                        <div>
                            <label
                                for="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                            >
                                Translation Key
                            </label>
                            <input
                                type="text"
                                name="newKey" value={newKey} onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder=" newKey"

                            />
                        </div>
                        <div className="flex gap-5 w-full">
                            <div className="w-full">
                                <label
                                    for="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                                >
                                    Translation Value
                                </label>
                                <input
                                    type="text"
                                    name="newValue" value={newValue} onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="newValue"

                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
            {/* <ToastContainer /> */}
        </div>
    )
}

export default CreateLanguage