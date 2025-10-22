import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  // 기본 정보
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
  };

  // 주소 정보
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  // 직업 정보
  employment: {
    company: string;
    position: string;
    department: string;
    startDate: string;
    salary: {
      amount: number;
      currency: string;
      frequency: "monthly" | "yearly";
    };
    benefits: {
      healthInsurance: boolean;
      dentalInsurance: boolean;
      retirementPlan: boolean;
      paidTimeOff: number;
    };
  };

  // 교육 정보
  education: {
    degree: string;
    field: string;
    institution: string;
    graduationYear: number;
    gpa: number;
    honors: string[];
  };

  // 가족 정보
  family: {
    maritalStatus: "single" | "married" | "divorced" | "widowed";
    spouse?: {
      name: string;
      occupation: string;
    };
    children: Array<{
      name: string;
      age: number;
      relationship: string;
    }>;
  };

  // 선호도
  preferences: {
    communication: {
      preferredLanguage: string;
      timezone: string;
      notificationMethods: string[];
    };
    work: {
      remoteWork: boolean;
      flexibleHours: boolean;
      travelWillingness: "none" | "occasional" | "frequent";
    };
    personal: {
      hobbies: string[];
      interests: string[];
      goals: string;
    };
  };
}

const NestedObjects: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "male",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      employment: {
        company: "",
        position: "",
        department: "",
        startDate: "",
        salary: {
          amount: 0,
          currency: "USD",
          frequency: "monthly",
        },
        benefits: {
          healthInsurance: false,
          dentalInsurance: false,
          retirementPlan: false,
          paidTimeOff: 0,
        },
      },
      education: {
        degree: "",
        field: "",
        institution: "",
        graduationYear: new Date().getFullYear(),
        gpa: 0,
        honors: [],
      },
      family: {
        maritalStatus: "single",
        children: [],
      },
      preferences: {
        communication: {
          preferredLanguage: "ko",
          timezone: "Asia/Seoul",
          notificationMethods: [],
        },
        work: {
          remoteWork: false,
          flexibleHours: false,
          travelWillingness: "none",
        },
        personal: {
          hobbies: [],
          interests: [],
          goals: "",
        },
      },
    },
  });

  const maritalStatus = watch("family.maritalStatus");
  const remoteWork = watch("preferences.work.remoteWork");

  const onSubmit = (data: FormData) => {
    console.log("중첩 객체 데이터:", data);
    alert("중첩 객체가 성공적으로 제출되었습니다!\n콘솔을 확인해보세요.");
  };

  const languages = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "영어" },
    { value: "ja", label: "일본어" },
    { value: "zh", label: "중국어" },
  ];

  const timezones = [
    { value: "Asia/Seoul", label: "서울 (UTC+9)" },
    { value: "America/New_York", label: "뉴욕 (UTC-5)" },
    { value: "Europe/London", label: "런던 (UTC+0)" },
    { value: "Asia/Tokyo", label: "도쿄 (UTC+9)" },
  ];

  const currencies = [
    { value: "USD", label: "USD" },
    { value: "KRW", label: "KRW" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ];

  const notificationMethods = [
    { value: "email", label: "이메일" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "푸시 알림" },
    { value: "phone", label: "전화" },
  ];

  const hobbies = [
    "독서",
    "영화감상",
    "음악감상",
    "운동",
    "요리",
    "여행",
    "게임",
    "사진촬영",
    "그림그리기",
    "악기연주",
    "춤",
    "기타",
  ];

  const interests = [
    "기술",
    "과학",
    "예술",
    "스포츠",
    "정치",
    "경제",
    "환경",
    "교육",
    "의료",
    "법률",
    "경영",
    "기타",
  ];

  return (
    <div className="page">
      <h1>중첩 객체 예제</h1>
      <p className="page-description">
        React Hook Form을 사용하여 복잡한 중첩 객체 구조를 관리하는 예제입니다.
        점 표기법을 사용하여 중첩된 필드에 접근하고 유효성 검사를 수행합니다.
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-section">
            <h3>개인 정보</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="personalInfo.name">이름</label>
                <input
                  id="personalInfo.name"
                  type="text"
                  {...register("personalInfo.name", {
                    required: "이름을 입력해주세요",
                  })}
                  className={errors.personalInfo?.name ? "error" : ""}
                />
                {errors.personalInfo?.name && (
                  <span className="error-message">
                    {errors.personalInfo.name.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="personalInfo.email">이메일</label>
                <input
                  id="personalInfo.email"
                  type="email"
                  {...register("personalInfo.email", {
                    required: "이메일을 입력해주세요",
                  })}
                  className={errors.personalInfo?.email ? "error" : ""}
                />
                {errors.personalInfo?.email && (
                  <span className="error-message">
                    {errors.personalInfo.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="personalInfo.phone">전화번호</label>
                <input
                  id="personalInfo.phone"
                  type="tel"
                  {...register("personalInfo.phone", {
                    required: "전화번호를 입력해주세요",
                  })}
                  className={errors.personalInfo?.phone ? "error" : ""}
                  placeholder="010-0000-0000"
                />
                {errors.personalInfo?.phone && (
                  <span className="error-message">
                    {errors.personalInfo.phone.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="personalInfo.dateOfBirth">생년월일</label>
                <input
                  id="personalInfo.dateOfBirth"
                  type="date"
                  {...register("personalInfo.dateOfBirth", {
                    required: "생년월일을 입력해주세요",
                  })}
                  className={errors.personalInfo?.dateOfBirth ? "error" : ""}
                />
                {errors.personalInfo?.dateOfBirth && (
                  <span className="error-message">
                    {errors.personalInfo.dateOfBirth.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>성별</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="male"
                    {...register("personalInfo.gender")}
                  />
                  <span>남성</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="female"
                    {...register("personalInfo.gender")}
                  />
                  <span>여성</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="other"
                    {...register("personalInfo.gender")}
                  />
                  <span>기타</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>주소 정보</h3>

            <div className="form-group">
              <label htmlFor="address.street">도로명 주소</label>
              <input
                id="address.street"
                type="text"
                {...register("address.street", {
                  required: "도로명 주소를 입력해주세요",
                })}
                className={errors.address?.street ? "error" : ""}
              />
              {errors.address?.street && (
                <span className="error-message">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.city">도시</label>
                <input
                  id="address.city"
                  type="text"
                  {...register("address.city", {
                    required: "도시를 입력해주세요",
                  })}
                  className={errors.address?.city ? "error" : ""}
                />
                {errors.address?.city && (
                  <span className="error-message">
                    {errors.address.city.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address.state">시/도</label>
                <input
                  id="address.state"
                  type="text"
                  {...register("address.state", {
                    required: "시/도를 입력해주세요",
                  })}
                  className={errors.address?.state ? "error" : ""}
                />
                {errors.address?.state && (
                  <span className="error-message">
                    {errors.address.state.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.zipCode">우편번호</label>
                <input
                  id="address.zipCode"
                  type="text"
                  {...register("address.zipCode", {
                    required: "우편번호를 입력해주세요",
                  })}
                  className={errors.address?.zipCode ? "error" : ""}
                />
                {errors.address?.zipCode && (
                  <span className="error-message">
                    {errors.address.zipCode.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address.country">국가</label>
                <input
                  id="address.country"
                  type="text"
                  {...register("address.country", {
                    required: "국가를 입력해주세요",
                  })}
                  className={errors.address?.country ? "error" : ""}
                />
                {errors.address?.country && (
                  <span className="error-message">
                    {errors.address.country.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.coordinates.latitude">위도</label>
                <input
                  id="address.coordinates.latitude"
                  type="number"
                  step="0.000001"
                  {...register("address.coordinates.latitude", {
                    valueAsNumber: true,
                  })}
                  className={
                    errors.address?.coordinates?.latitude ? "error" : ""
                  }
                />
                {errors.address?.coordinates?.latitude && (
                  <span className="error-message">
                    {errors.address.coordinates.latitude.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address.coordinates.longitude">경도</label>
                <input
                  id="address.coordinates.longitude"
                  type="number"
                  step="0.000001"
                  {...register("address.coordinates.longitude", {
                    valueAsNumber: true,
                  })}
                  className={
                    errors.address?.coordinates?.longitude ? "error" : ""
                  }
                />
                {errors.address?.coordinates?.longitude && (
                  <span className="error-message">
                    {errors.address.coordinates.longitude.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>직업 정보</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employment.company">회사명</label>
                <input
                  id="employment.company"
                  type="text"
                  {...register("employment.company", {
                    required: "회사명을 입력해주세요",
                  })}
                  className={errors.employment?.company ? "error" : ""}
                />
                {errors.employment?.company && (
                  <span className="error-message">
                    {errors.employment.company.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="employment.position">직책</label>
                <input
                  id="employment.position"
                  type="text"
                  {...register("employment.position", {
                    required: "직책을 입력해주세요",
                  })}
                  className={errors.employment?.position ? "error" : ""}
                />
                {errors.employment?.position && (
                  <span className="error-message">
                    {errors.employment.position.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employment.department">부서</label>
                <input
                  id="employment.department"
                  type="text"
                  {...register("employment.department", {
                    required: "부서를 입력해주세요",
                  })}
                  className={errors.employment?.department ? "error" : ""}
                />
                {errors.employment?.department && (
                  <span className="error-message">
                    {errors.employment.department.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="employment.startDate">입사일</label>
                <input
                  id="employment.startDate"
                  type="date"
                  {...register("employment.startDate", {
                    required: "입사일을 입력해주세요",
                  })}
                  className={errors.employment?.startDate ? "error" : ""}
                />
                {errors.employment?.startDate && (
                  <span className="error-message">
                    {errors.employment.startDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-subsection">
              <h4>급여 정보</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employment.salary.amount">급여액</label>
                  <input
                    id="employment.salary.amount"
                    type="number"
                    {...register("employment.salary.amount", {
                      valueAsNumber: true,
                    })}
                    className={errors.employment?.salary?.amount ? "error" : ""}
                  />
                  {errors.employment?.salary?.amount && (
                    <span className="error-message">
                      {errors.employment.salary.amount.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="employment.salary.currency">통화</label>
                  <select {...register("employment.salary.currency")}>
                    {currencies.map((currency) => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>급여 주기</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="monthly"
                        {...register("employment.salary.frequency")}
                      />
                      <span>월급</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="yearly"
                        {...register("employment.salary.frequency")}
                      />
                      <span>연봉</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-subsection">
              <h4>복리후생</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("employment.benefits.healthInsurance")}
                  />
                  <span>건강보험</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("employment.benefits.dentalInsurance")}
                  />
                  <span>치과보험</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("employment.benefits.retirementPlan")}
                  />
                  <span>퇴직금</span>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="employment.benefits.paidTimeOff">
                  유급휴가 (일)
                </label>
                <input
                  id="employment.benefits.paidTimeOff"
                  type="number"
                  {...register("employment.benefits.paidTimeOff", {
                    valueAsNumber: true,
                  })}
                  className={
                    errors.employment?.benefits?.paidTimeOff ? "error" : ""
                  }
                />
                {errors.employment?.benefits?.paidTimeOff && (
                  <span className="error-message">
                    {errors.employment.benefits.paidTimeOff.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>교육 정보</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.degree">학위</label>
                <input
                  id="education.degree"
                  type="text"
                  {...register("education.degree", {
                    required: "학위를 입력해주세요",
                  })}
                  className={errors.education?.degree ? "error" : ""}
                />
                {errors.education?.degree && (
                  <span className="error-message">
                    {errors.education.degree.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="education.field">전공</label>
                <input
                  id="education.field"
                  type="text"
                  {...register("education.field", {
                    required: "전공을 입력해주세요",
                  })}
                  className={errors.education?.field ? "error" : ""}
                />
                {errors.education?.field && (
                  <span className="error-message">
                    {errors.education.field.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.institution">학교명</label>
                <input
                  id="education.institution"
                  type="text"
                  {...register("education.institution", {
                    required: "학교명을 입력해주세요",
                  })}
                  className={errors.education?.institution ? "error" : ""}
                />
                {errors.education?.institution && (
                  <span className="error-message">
                    {errors.education.institution.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="education.graduationYear">졸업년도</label>
                <input
                  id="education.graduationYear"
                  type="number"
                  {...register("education.graduationYear", {
                    valueAsNumber: true,
                  })}
                  className={errors.education?.graduationYear ? "error" : ""}
                />
                {errors.education?.graduationYear && (
                  <span className="error-message">
                    {errors.education.graduationYear.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="education.gpa">GPA</label>
              <input
                id="education.gpa"
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                {...register("education.gpa", { valueAsNumber: true })}
                className={errors.education?.gpa ? "error" : ""}
              />
              {errors.education?.gpa && (
                <span className="error-message">
                  {errors.education.gpa.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>가족 정보</h3>

            <div className="form-group">
              <label>결혼 상태</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="single"
                    {...register("family.maritalStatus")}
                  />
                  <span>미혼</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="married"
                    {...register("family.maritalStatus")}
                  />
                  <span>기혼</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="divorced"
                    {...register("family.maritalStatus")}
                  />
                  <span>이혼</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="widowed"
                    {...register("family.maritalStatus")}
                  />
                  <span>사별</span>
                </label>
              </div>
            </div>

            {maritalStatus === "married" && (
              <div className="form-subsection conditional-section">
                <h4>배우자 정보</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="family.spouse.name">배우자 이름</label>
                    <input
                      id="family.spouse.name"
                      type="text"
                      {...register("family.spouse.name")}
                      className={errors.family?.spouse?.name ? "error" : ""}
                    />
                    {errors.family?.spouse?.name && (
                      <span className="error-message">
                        {errors.family.spouse.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="family.spouse.occupation">
                      배우자 직업
                    </label>
                    <input
                      id="family.spouse.occupation"
                      type="text"
                      {...register("family.spouse.occupation")}
                      className={
                        errors.family?.spouse?.occupation ? "error" : ""
                      }
                    />
                    {errors.family?.spouse?.occupation && (
                      <span className="error-message">
                        {errors.family.spouse.occupation.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>선호도</h3>

            <div className="form-subsection">
              <h4>의사소통</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preferences.communication.preferredLanguage">
                    선호 언어
                  </label>
                  <select
                    {...register("preferences.communication.preferredLanguage")}
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="preferences.communication.timezone">
                    시간대
                  </label>
                  <select {...register("preferences.communication.timezone")}>
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>알림 방법</label>
                <div className="checkbox-group">
                  {notificationMethods.map((method) => (
                    <label key={method.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={method.value}
                        {...register(
                          "preferences.communication.notificationMethods"
                        )}
                      />
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-subsection">
              <h4>업무</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("preferences.work.remoteWork")}
                  />
                  <span>원격 근무 가능</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("preferences.work.flexibleHours")}
                  />
                  <span>유연한 근무 시간</span>
                </label>
              </div>

              <div className="form-group">
                <label>출장 의향</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="none"
                      {...register("preferences.work.travelWillingness")}
                    />
                    <span>불가능</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="occasional"
                      {...register("preferences.work.travelWillingness")}
                    />
                    <span>가끔</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="frequent"
                      {...register("preferences.work.travelWillingness")}
                    />
                    <span>자주</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-subsection">
              <h4>개인</h4>
              <div className="form-group">
                <label>취미</label>
                <div className="checkbox-group">
                  {hobbies.map((hobby) => (
                    <label key={hobby} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={hobby}
                        {...register("preferences.personal.hobbies")}
                      />
                      <span>{hobby}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>관심사</label>
                <div className="checkbox-group">
                  {interests.map((interest) => (
                    <label key={interest} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={interest}
                        {...register("preferences.personal.interests")}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferences.personal.goals">목표</label>
                <textarea
                  id="preferences.personal.goals"
                  {...register("preferences.personal.goals")}
                  rows={3}
                  placeholder="개인적인 목표나 계획을 입력해주세요"
                />
              </div>
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
          <li>점 표기법으로 중첩된 객체 필드 접근</li>
          <li>
            <code>watch</code>로 중첩된 필드 값 감시
          </li>
          <li>복잡한 중첩 구조의 유효성 검사</li>
          <li>조건부 필드 렌더링</li>
          <li>배열과 객체가 혼재된 복잡한 데이터 구조 처리</li>
        </ul>
      </div>
    </div>
  );
};

export default NestedObjects;
