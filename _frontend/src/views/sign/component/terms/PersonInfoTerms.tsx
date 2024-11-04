/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:개인정보 수집이용 동의서
 * @작성자:김성철
 ********************************/

export default function PersonInfoTerms() {
  return (
    <div className="terms">
      <h3>제1조 (수집하는 개인정보의 항목)</h3>
      <p>회사는 회원가입, 상담, 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
      <ul>
        <li>필수항목: 아이디(ID), 비밀번호, 이름, 생년월일, 휴대폰 번호, 이메일 주소</li>
      </ul>

      <h3>제2조 (개인정보의 수집 및 이용목적)</h3>
      <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
      <ol>
        <li>
          서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
          <ul>
            <li>콘텐츠 제공, 특정 맞춤 서비스 제공, 본인 인증</li>
          </ul>
        </li>
        <li>
          회원 관리
          <ul>
            <li>
              회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사
              확인, 연령 확인, 만 14세 미만 아동 개인정보 수집 시 법정 대리인 동의 여부 확인, 분쟁 조정을 위한 기록
              보존, 불만 처리 등 민원 처리, 고지사항 전달
            </li>
          </ul>
        </li>
        <li>
          마케팅 및 광고에 활용
          <ul>
            <li>
              신규 서비스 개발과 이벤트 행사에 따른 정보 전달 및 맞춤 서비스 제공, 인구통계학적 특성에 따른 서비스 제공
              및 광고 게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계
            </li>
          </ul>
        </li>
      </ol>

      <h3>제3조 (개인정보의 보유 및 이용기간)</h3>
      <p>
        회원의 개인정보는 회원탈퇴 시까지 보유 및 이용됩니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우
        회사는 아래와 같이 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
      </p>
      <ul>
        <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
      </ul>

      <h3>제4조 (개인정보 제공)</h3>
      <p>회사는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
      <ul>
        <li>회원이 사전에 동의한 경우</li>
        <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
      </ul>

      <h3>제5조 (개인정보의 파기절차 및 방법)</h3>
      <p>
        회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은
        다음과 같습니다.
      </p>
      <ol>
        <li>
          파기절차
          <ul>
            <li>
              회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 (종이의 경우 별도의 서류함)
              내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후
              파기됩니다.
            </li>
          </ul>
        </li>
        <li>
          파기방법
          <ul>
            <li>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
            <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
          </ul>
        </li>
      </ol>

      <h3>제6조 (이용자의 권리와 그 행사방법)</h3>
      <p>
        이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
        개인정보 조회, 수정, 삭제, 회원탈퇴를 위해서는 '회원정보수정'을 클릭하여 본인 확인 절차를 거치신 후 직접 열람,
        정정 또는 탈퇴가 가능합니다.
      </p>
    </div>
  )
}
