import React from 'react'
// import Sidebar from '../../components/sidebar/Sidebar'
// import CreateLanguage from '../../components/language/createLanguage/CreateLanguage'
import { Layout } from 'antd';
import CreateLanguage from '../components/createLanguage/CreateLanguage';
const { Content } = Layout;

function CreateLanguagePage() {
  return (
    <div>
      <Layout>
        {/* <div className='fixed'>
                    <Sidebar />
                </div>
                <Layout style={{ marginLeft: 200, }}  > */}
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: 'white', }} >
          <CreateLanguage />
        </Content>
        {/* </Layout> */}
      </Layout>
    </div>
  )
}

export default CreateLanguagePage