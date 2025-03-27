import React from 'react'
// import Sidebar from '../../components/sidebar/Sidebar'
// import ViewLanguages from '../../components/language/viewLanguage/ViewLanguages'
import { Layout } from 'antd';
import ViewLanguages from '../components/viewLanguage/ViewLanguages';
const { Content } = Layout;

function ViewLanguagePage() {
    return (
        <div>
            <Layout>
                {/* <div className='fixed'>
                    <Sidebar />
                </div>
                <Layout style={{ marginLeft: 200, }}  > */}
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: 'white', }} >
                        <ViewLanguages />
                    </Content>
                {/* </Layout> */}
            </Layout>
        </div>
    )
}

export default ViewLanguagePage