import { BackBtnHeader } from 'components/layout/CustomHeader'
import { Modals } from 'components/utils/Modals'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useModal from 'state/useModal'
import useSign from 'state/useSign'
import ASU0101P03 from 'views/sign/component/terms/UseTerms'
import ASU0101P04 from 'views/sign/component/terms/PersonInfoTerms'

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입 약관화면
 * @작성자:김성철
 ********************************/

export interface modalContentProps {
  Props1?: JSX.Element | null | string | object
  Props2?: string
}

type ModalType = 'component' | 'confirm'
export default function Terms() {
  const navigate = useNavigate()
  const { optionState, setOptionState } = useSign()
  const [modalType, setModalType] = useState<ModalType>('component')
  const { isOpen, onOpen } = useModal(modalType)
  const [modalContent, setModalContent] = useState<modalContentProps>({
    Props1: null,
    Props2: '',
  })
  const func = {
    onClickTerms: (type: string) => {
      setModalType('component')
      if (type === 'use') {
        setModalContent({
          Props1: <ASU0101P03 />,
          Props2: '이용약관',
        })
      }
      if (type === 'private') {
        setModalContent({
          Props1: <ASU0101P04 />,
          Props2: '개인정보 수집 이용 동의서',
        })
      }
    },
    next: () => {
      setModalType('confirm')
      if (optionState('use') && optionState('priv')) {
        navigate('/sign')
      } else {
        setModalContent({
          Props1: {
            content: '필수약관에 동의해주세요!',
          },
        })
      }
    },
  }
  useEffect(() => {
    if (modalContent.Props1 || modalContent.Props2) {
      onOpen()
    }
  }, [modalContent])
  return (
    <>
      <BackBtnHeader title={'회원가입'} />
      {isOpen && <Modals Props1={modalContent.Props1} Props2={modalContent.Props2} />}
      <div className="sgin-terms">
        <div className="sgin-terms__subject">
          <div className="title__sub1">
            <span>동행인</span>으로서 첫 발걸음에
            <div className="sub__logo" />
          </div>
          <div className="title__sub2">진심으로 환영합니다.</div>
        </div>
        <div className="sgin-terms__contents">
          <div className="sgin-terms__agreement">
            <button
              className={`option__btn ${
                optionState('all') && optionState('use') && optionState('priv') ? 'check' : ''
              } `}
              onClick={() => setOptionState('all')}
            />
            <div className="option__text all" onClick={() => setOptionState('all')}>
              약관 전체동의
            </div>
          </div>
          <div className="borderline"></div>
          <div className="sgin-terms__agreements">
            <div className="sgin-terms__agreement">
              <button
                className={`option__btn ${optionState('use') ? 'check' : ''} `}
                onClick={() => setOptionState('use')}
              />
              <div className="option__text" onClick={() => setOptionState('use')}>
                이용약관 동의(필수)
              </div>
              <div className="terms__btn" onClick={() => func.onClickTerms('use')} />
            </div>

            <div className="sgin-terms__agreement">
              <button
                className={`option__btn ${optionState('priv') ? 'check' : ''} `}
                onClick={() => setOptionState('priv')}
              />
              <div className="option__text" onClick={() => setOptionState('priv')}>
                개인정보 수집 및 이용동의(필수)
              </div>
              <div className="terms__btn" onClick={() => func.onClickTerms('private')} />
            </div>
          </div>
        </div>
        <button className="sign-term__btn" onClick={() => func.next()}>
          <div>시작하기</div>
        </button>
      </div>
    </>
  )
}
