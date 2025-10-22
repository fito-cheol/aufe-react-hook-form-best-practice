import React from "react";
import { useForm, useWatch } from "react-hook-form";

interface FormData {
  userType: "individual" | "company" | "";
  name: string;
  email: string;
  phone: string;
  
  // 개인 사용자 필드
  age: number;
  gender: "male" | "female" | "";
  occupation: string;
  
  // 기업 사용자 필드
  companyName: string;
  businessNumber: string;
  industry: string;
  companySize: "small" | "medium" | "large" | "";
  
  // 공통 선택 필드
  newsletter: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  // 추가 정보 (조건부)
  additionalInfo: string;
  hasExperience: boolean;
  experienceYears: number;
  skills: string[];
}

const ConditionalFields: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      userType: "",
      name: "",
      email: "",
      phone: "",
      age: 18,
      gender: "",
      occupation: "",
      companyName: "",
      businessNumber: "",
      industry: "",
      companySize: "",
      newsletter: false,
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
      additionalInfo: "",
      hasExperience: false,
      experienceYears: 0,
      skills: [],
    },
  });

  // useWatch로 특정 필드 값 감시
  const userType = useWatch({
    control,
    name: "userType",
  });

  const hasExperience = useWatch({
    control,
    name: "hasExperience",
  });

  const newsletter = useWatch({
    control,
    name: "newsletter",
  });

  const onSubmit = (data: FormData) => {
    console.log("조건부 필드 데이터:", data);
    alert("조건부 필드가 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  const industries = [
    { value: "tech", label: "기술" },
    { value: "finance", label: "금융" },
    { value: "healthcare", label: "의료" },
    { value: "education", label: "교육" },
    { value: "retail", label: "소매" },
    { value: "manufacturing", label: "제조업" },
  ];

  const skillOptions = [
    "JavaScript", "TypeScript", "React", "Vue", "Angular",
    "Node.js", "Python", "Java", "C#", "Go", "Rust",
    "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL",
  ];

  return (
    <div className="page">
      <h1>조건부 필드 예제</h1>
      <p className="page-description">
        <code>useWatch</code>를 사용하여 조건에 따라 필드를 표시하거나 숨기는 예제입니다.
        사용자 타입, 경험 여부 등에 따라 다른 필드들이 나타납니다.
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-section">
            <h3>사용자 타입</h3>
            
            <div className="form-group">
              <label>사용자 타입</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="individual"
                    {...register("userType", { required: "사용자 타입을 선택해주세요" })}
                  />
                  <span>개인 사용자</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="company"
                    {...register("userType", { required: "사용자 타입을 선택해주세요" })}
                  />
                  <span>기업 사용자</span>
                </label>
              </div>
              {errors.userType && (
                <span className="error-message">{errors.userType.message}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>기본 정보</h3>
            
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "이름을 입력해주세요" })}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "이메일을 입력해주세요" })}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호</label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { required: "전화번호를 입력해주세요" })}
                className={errors.phone ? "error" : ""}
                placeholder="010-0000-0000"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>
          </div>

          {/* 개인 사용자 필드 */}
          {userType === "individual" && (
            <div className="form-section conditional-section">
              <h3>개인 정보</h3>
              
              <div className="form-group">
                <label htmlFor="age">나이</label>
                <input
                  id="age"
                  type="number"
                  {...register("age", {
                    required: "나이를 입력해주세요",
                    min: { value: 18, message: "나이는 18세 이상이어야 합니다" },
                    max: { value: 100, message: "나이는 100세 이하여야 합니다" },
                  })}
                  className={errors.age ? "error" : ""}
                  min="18"
                  max="100"
                />
                {errors.age && (
                  <span className="error-message">{errors.age.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>성별</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="male"
                      {...register("gender", { required: "성별을 선택해주세요" })}
                    />
                    <span>남성</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="female"
                      {...register("gender", { required: "성별을 선택해주세요" })}
                    />
                    <span>여성</span>
                  </label>
                </div>
                {errors.gender && (
                  <span className="error-message">{errors.gender.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="occupation">직업</label>
                <input
                  id="occupation"
                  type="text"
                  {...register("occupation", { required: "직업을 입력해주세요" })}
                  className={errors.occupation ? "error" : ""}
                />
                {errors.occupation && (
                  <span className="error-message">{errors.occupation.message}</span>
                )}
              </div>
            </div>
          )}

          {/* 기업 사용자 필드 */}
          {userType === "company" && (
            <div className="form-section conditional-section">
              <h3>기업 정보</h3>
              
              <div className="form-group">
                <label htmlFor="companyName">회사명</label>
                <input
                  id="companyName"
                  type="text"
                  {...register("companyName", { required: "회사명을 입력해주세요" })}
                  className={errors.companyName ? "error" : ""}
                />
                {errors.companyName && (
                  <span className="error-message">{errors.companyName.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="businessNumber">사업자등록번호</label>
                <input
                  id="businessNumber"
                  type="text"
                  {...register("businessNumber", {
                    required: "사업자등록번호를 입력해주세요",
                    pattern: {
                      value: /^\d{3}-\d{2}-\d{5}$/,
                      message: "올바른 사업자등록번호 형식을 입력해주세요 (000-00-00000)",
                    },
                  })}
                  className={errors.businessNumber ? "error" : ""}
                  placeholder="000-00-00000"
                />
                {errors.businessNumber && (
                  <span className="error-message">{errors.businessNumber.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="industry">업종</label>
                <select
                  id="industry"
                  {...register("industry", { required: "업종을 선택해주세요" })}
                  className={errors.industry ? "error" : ""}
                >
                  <option value="">업종을 선택해주세요</option>
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <span className="error-message">{errors.industry.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>회사 규모</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="small"
                      {...register("companySize", { required: "회사 규모를 선택해주세요" })}
                    />
                    <span>소규모 (1-50명)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="medium"
                      {...register("companySize", { required: "회사 규모를 선택해주세요" })}
                    />
                    <span>중규모 (51-500명)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="large"
                      {...register("companySize", { required: "회사 규모를 선택해주세요" })}
                    />
                    <span>대규모 (500명 이상)</span>
                  </label>
                </div>
                {errors.companySize && (
                  <span className="error-message">{errors.companySize.message}</span>
                )}
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>알림 설정</h3>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register("newsletter")}
                />
                <span>뉴스레터 구독</span>
              </label>
            </div>

            {newsletter && (
              <div className="form-group conditional-section">
                <label>알림 방법</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register("notifications.email")}
                    />
                    <span>이메일</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register("notifications.sms")}
                    />
                    <span>SMS</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register("notifications.push")}
                    />
                    <span>푸시 알림</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>추가 정보</h3>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register("hasExperience")}
                />
                <span>관련 경험이 있습니다</span>
              </label>
            </div>

            {hasExperience && (
              <div className="form-group conditional-section">
                <label htmlFor="experienceYears">경력 (년)</label>
                <input
                  id="experienceYears"
                  type="number"
                  {...register("experienceYears", {
                    required: "경력을 입력해주세요",
                    min: { value: 1, message: "경력은 1년 이상이어야 합니다" },
                    max: { value: 50, message: "경력은 50년 이하여야 합니다" },
                  })}
                  className={errors.experienceYears ? "error" : ""}
                  min="1"
                  max="50"
                />
                {errors.experienceYears && (
                  <span className="error-message">{errors.experienceYears.message}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="additionalInfo">추가 정보</label>
              <textarea
                id="additionalInfo"
                {...register("additionalInfo")}
                rows={3}
                placeholder="추가로 전달하고 싶은 정보가 있다면 입력해주세요"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              제출
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              초기화
            </button>
          </div>
        </form>
      </div>

      <div className="code-explanation">
        <h3>주요 포인트</h3>
        <ul>
          <li>
            <code>useWatch</code>로 특정 필드 값 실시간 감시
          </li>
          <li>
            조건부 렌더링으로 필드 표시/숨김
          </li>
          <li>
            중첩된 조건부 필드 처리
          </li>
          <li>
            사용자 타입에 따른 다른 폼 구조
          </li>
          <li>
            체크박스 상태에 따른 추가 필드 표시
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConditionalFields;
