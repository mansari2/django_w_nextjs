'use client';

import { CodeOutlined, HomeOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './RootLayoutClient.module.css';

const { Content, Footer, Sider } = Layout;

enum MENU_ITEM_NAME {
  HOME = 'Home',
  TEST_CASES = 'Test Cases',
}

const MENU_ITEMS_CONFIG = [
  {
    icon: HomeOutlined,
    name: MENU_ITEM_NAME.HOME,
    route: '/home',
  },
  {
    icon: CodeOutlined,
    name: MENU_ITEM_NAME.TEST_CASES,
    route: '/test-cases',
  },
];

const MENU_ITEMS = MENU_ITEMS_CONFIG.map((iconInfo) => ({
  icon: React.createElement(iconInfo.icon),
  key: iconInfo.name,
  label: <a href={iconInfo.route}>{iconInfo.name}</a>,
}));

interface IRootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({
  children,
}: IRootLayoutClientProps): React.ReactNode {
  const pathname = usePathname();
  const initialSelectedMenuItem = MENU_ITEMS_CONFIG.find(({ route }) =>
    pathname.startsWith(route)
  );

  const initialRoute = initialSelectedMenuItem?.name ?? '';

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
        components: {
          Result: {
            iconFontSize: 32,
            titleFontSize: 14,
            extraMargin: 0,
          },
        },
      }}
    >
      <Layout hasSider className={styles['root-container']}>
        <Sider collapsed width={250}>
          <Menu
            defaultSelectedKeys={[initialRoute]}
            items={MENU_ITEMS}
            mode='inline'
            theme='dark'
          />
        </Sider>
        <Layout>
          <Content style={{ padding: '16px 16px 0px 16px' }}>
            <main style={{ padding: 16 }}>{children}</main>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Shoot for the moon © 2024 Scout AI.
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
