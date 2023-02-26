import { Avatar, Dropdown, Navbar, Text, Row } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

import SearchInput from '@/components/navbar/search'
import ThemeToggle from '@/components/theme/theme-toggle'
import BgThemeToggle from '@/components/background/bg-theme-toggle'
import LinkSocialIcon from '@/components/common/link-social-icon'

import { PROJECT_GITHUB_URL } from '@/lib/constants'
import { Github } from '@/lib/icons'

// modals: 
import InfoModal from '@/components/navbar/personal-modals/info'
import LoginModal from '@/components/navbar/personal-modals/login'
import RegistryModal from '@/components/navbar/personal-modals/registry'
import LogoutModal from '@/components/navbar/personal-modals/logout'
import WriteArticleModal from '@/components/navbar/personal-modals/editor'
import ArticleManagerModal from '@/components/navbar/personal-modals/article'
import { changeArticleManagerVisible, changeInfoVisible, changeLoginVisible, changeLogoutVisible, changeRegistryVisible, changeWriteArticleVisible } from '@/redux/slices/personalSlice'

const FootNavbar = () => {
  const [isSigned, info] = useSelector((state) => {
    const user = state.user
    return [user.isSigned, user.info]
  })

  const dispatch = useDispatch()

  const personalActions = (key) => {
    switch (key) {
      case 'Login_Logout':
        isSigned ? dispatch(changeLogoutVisible(true)) : dispatch(changeLoginVisible(true))
        return
      case 'Personal_Info':
        if (isSigned) dispatch(changeInfoVisible(true))
        return
      case 'Registry':
        dispatch(changeRegistryVisible(true))
        return
      case 'Write_Article':
        dispatch(changeWriteArticleVisible(true))
        return
      case 'Article_Manager':
        dispatch(changeArticleManagerVisible(true))
        return
    }
  }

  return (
    <>
      <Navbar isBordered variant='floating' css={{ position: 'fixed', top: 'auto', bottom: '$10', zIndex: '$5', background: 'none' }} >
        <Navbar.Brand css={{ '@xs': { w: '80%', jc: 'center' } }}>
          <SearchInput />
        </Navbar.Brand>
        <Navbar.Content css={{ jc: 'flex-end' }}>
          <Navbar.Item>
            <Row align='center' className='navbar__social-icons-container' css={{ w: 'initial' }}>
              <BgThemeToggle />
              <ThemeToggle />
              <LinkSocialIcon href={PROJECT_GITHUB_URL} icon={<Github size={20} />} />
            </Row>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Content aria-labelledby='Personal center'>
          <Dropdown placement='top-left'>
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar bordered as='button' color='gradient' size='md' src={info.avatar} alt={info.avatar} textColor='white' />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu color='primary' key='Personal_Center' disabledKeys={isSigned ? ['Registry'] : ['Personal_Info', 'Write_Article', 'Article_Manager']} onAction={personalActions}>
              <Dropdown.Item key='Personal_Info' textValue='Personal Info'>
                <Text color='secondary' css={{ d: 'flex' }}>{info.nickname}</Text>
                <Text small color='primary' css={{ d: 'flex' }}>{info.desc}</Text>
              </Dropdown.Item>
              <Dropdown.Item css={{ display: isSigned ? '' : 'none' }} key='Write_Article' withDivider textValue='Write Article'>写文章</Dropdown.Item>
              <Dropdown.Item css={{ display: isSigned ? '' : 'none' }} key='Article_Manager' textValue='Article Manager'>文章中心</Dropdown.Item>
              <Dropdown.Item key='Login_Logout' withDivider color={isSigned ? 'error' : 'success'} textValue='Login & Logout'>
                {isSigned ? '注销' : '登录'}
              </Dropdown.Item>
              <Dropdown.Item css={{ display: isSigned ? 'none' : '' }} key='Registry' withDivider color='secondary' textValue='Registry'>注册</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
      <InfoModal />
      <LoginModal />
      <LogoutModal />
      <RegistryModal />
      <WriteArticleModal />
      <ArticleManagerModal />
    </>
  )
}

export default FootNavbar