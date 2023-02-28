import { Button, Card, Col, Input, Loading, Popover, Row, styled, Text, Textarea, useTheme } from "@nextui-org/react"
import { useEffect, useMemo, useState } from "react"

import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

import { emojis } from './emoji'
import { FETCH_PUBLISH_URL, FETCH_UPLOAD_ARTICLE_URL, FETCH_UPLOAD_URL } from '@/lib/api'
import Vditor from 'vditor'

import 'vditor/dist/index.css'
import { changeWriteArticleVisible } from "@/redux/slices/personalSlice"
import { useDispatch } from "react-redux"
import { CookieUtils, cookieUtils, StringUtils, stringUtils } from "@/lib/utils"
import { COOKIE_NAMES, PROJECT_INPUT_TIP, PROJECT_REGS } from "@/lib/constants"

const StyledEditor = styled('div', {
  pre: {
    borderRadius: '$0'
  }
})

const Editor = () => {
  const [vd, setVd] = useState()
  const [isPushing, setIsPushing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState(PROJECT_INPUT_TIP.default.welcome)

  const { isDark } = useTheme()

  const dispatch = useDispatch()

  if (vd) {
    vd.setTheme(
      isDark ? 'dark' : 'classic',
      isDark ? 'dark' : 'light'
    )
  }

  const isValid = useMemo(() => StringUtils.isNotBlank(title) || StringUtils.isBlank(desc), [desc, title])

  const publish = async () => {
    if (isPushing) return
    setIsPushing(true)
    setIsOpen(false)
    const formdata = new FormData()
    formdata.append('title', Base64.stringify(Utf8.parse(title)))
    formdata.append('desc', Base64.stringify(Utf8.parse(desc)))
    formdata.append('file', vd.getHTML())
    await fetch(FETCH_UPLOAD_ARTICLE_URL, {
      method: "post",
      headers: {
        Authorization: CookieUtils.get(COOKIE_NAMES.TOKEN),
      },
      body: formdata
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 2000) {

          console.log('发布成功!')
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsPushing(false)
      })
  }

  useEffect(() => {
    const vditor = new Vditor('vditor', {
      height: '100%',
      value: '# Welcome to zBlog.',
      mode: 'wysiwyg',
      counter: {
        enable: true
      },
      toolbar: [
        'emoji', 'headings', 'bold', 'italic', 'strike', '|',
        'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
        'quote', 'line', 'code', 'inline-code', 'insert-after', 'insert-before', '|',
        'upload', 'link', 'table', 'outline', '|',
        'undo', 'redo', '|',
        'edit-mode', 'fullscreen', 'export',
        {
          name: 'more',
          toolbar: [
            'both',
            'preview',
            'code-theme',
            'content-theme',
            'br'
          ]
        }
      ],
      preview: { actions: ['desktop', 'tablet', 'mp-wechat'] },
      hint: { emoji: emojis },
      upload: {
        accept: 'image/*,.wav,.jpg,.png,.gif,.jpeg,.svg',
        multiple: false,
        fieldName: 'files',
        filename(name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
            .replace('/\\s/g', '');
        },
        extraData: {
          type: 'md'
        },
        format(files, responseText) {
          const res = JSON.parse(responseText);
          const name = files[0].name;
          const url = res.data.url;
          return JSON.stringify({ code: 0, data: { errFiles: '', succMap: { [name]: url } } });
        },
        url: FETCH_UPLOAD_URL
      },
      cache: false,
      after: () => {
        setVd(vditor);
        vditor.setValue('# Welcome to zBlog.')
      }
    })
  }, [])

  return (
    <Col css={{ width: '100%', height: "90%", m: '$0 auto', '@md': { width: '80%' } }}>
      <StyledEditor id='vditor' className='vditor' />
      <Row justify='flex-end' css={{ mt: '$5' }}>
        <Button css={{ mr: '$10' }} auto size='sm' color='error' onPress={() => dispatch(changeWriteArticleVisible(false))}>关闭</Button>
        <Popover isBordered isOpen={isOpen} onOpenChange={setIsOpen} placement='top-left'>
          <Popover.Trigger>
            <Button css={{ mr: '$10' }} auto size='sm' disabled={isPushing}>
              {isPushing ? <Loading color='currentColor' type='spinner' size='md' /> : '发布'}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Card>
              <Card.Header>
                <Text h4 color='primary'>欢迎发布</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  clearable
                  defaultValue={title}
                  labelLeft='Title'
                  placeholder='标题'
                  status='success'
                  minLength={1}
                  maxLength={10}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-label='Title input'
                />
                <Textarea
                  css={{ mt: '$10' }}
                  initialValue={desc}
                  defaultValue={desc}
                  placeholder='简介'
                  status='success'
                  maxLength={100}
                  minRows={1}
                  maxRows={10}
                  onChange={(e) => setDesc(e.target.value)}
                  aria-label='Article desc textarea'
                />
              </Card.Body>
              <Card.Footer>
                <Button auto size='sm' onPress={() => setIsOpen(false)} css={{ mr: '$10' }}>取消</Button>
                <Button auto size='sm' onPress={publish} disabled={!isValid}>确认</Button>
              </Card.Footer>
            </Card>
          </Popover.Content>
        </Popover>
      </Row>
    </Col>
  )
}

export default Editor